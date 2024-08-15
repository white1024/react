from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_planner.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # 更改為安全的密鑰
jwt = JWTManager(app)
db = SQLAlchemy(app)

from models import User, Place
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/places', methods=['GET', 'POST'])
@jwt_required()
def places():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        user_places = Place.query.filter_by(user_id=user_id).order_by(Place.order).all()
        return jsonify([{"id": place.id, "name": place.name} for place in user_places])
    elif request.method == 'POST':
        data = request.get_json()
        new_place = Place(name=data['name'], order=data['order'], user_id=user_id)
        db.session.add(new_place)
        db.session.commit()
        return jsonify({"id": new_place.id, "name": new_place.name}), 201

@app.route('/places/reorder', methods=['PUT'])
@jwt_required()
def reorder_places():
    user_id = get_jwt_identity()
    data = request.get_json()
    for index, place_data in enumerate(data['places']):
        place = Place.query.filter_by(id=place_data['id'], user_id=user_id).first()
        if place:
            place.order = index
    db.session.commit()
    return jsonify({"message": "Places reordered successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)