from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
# 配置
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Place(db.Model):
    id = db.Column(db.String(120), primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    user_id = get_jwt_identity()
    user = User.query.filter_by(username=user_id).first()
    return jsonify(user={"username": user.username}), 200

@app.route('/delete-user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.filter_by(username=user_id).first()
    if user:
        places = Place.query.filter_by(user_id=user_id).order_by(Place.order).all()
        db.session.delete(places)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted successfully"}), 200
    return jsonify({"msg": "User not found"}), 404

@app.route('/api/places', methods=['GET', 'POST'])
@jwt_required()
def handle_places():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        places = Place.query.filter_by(user_id=user_id).order_by(Place.order).all()
        return jsonify([{'id': place.id, 'name': place.name} for place in places])
    elif request.method == 'POST':
        data = request.get_json()
        max_order = db.session.query(db.func.max(Place.order)).filter_by(user_id=user_id).scalar() or 0
        new_place = Place(id=data['id'], name=data['name'], user_id=user_id, order=max_order + 1)
        db.session.add(new_place)
        db.session.commit()
        return jsonify({'message': 'Place added successfully'}), 201

@app.route('/api/places/reorder', methods=['PUT'])
@jwt_required()
def reorder_places():
    user_id = get_jwt_identity()
    data = request.get_json()
    for index, place in enumerate(data['places']):
        db_place = Place.query.filter_by(id=place['id'], user_id=user_id).first()
        if db_place:
            db_place.order = index
    db.session.commit()
    return jsonify({'message': 'Places reordered successfully'}), 200

@app.route('/api/places/<string:place_id>', methods=['DELETE'])
@jwt_required()
def delete_place(place_id):
    user_id = get_jwt_identity()
    place = Place.query.filter_by(id=place_id, user_id=user_id).first()
    if not place:
        return jsonify({"message": "Place not found or you don't have permission to delete it"}), 404
    try:
        db.session.delete(place)
        # 更新其他地點的順序
        Place.query.filter(Place.user_id == user_id, Place.order > place.order).update(
            {Place.order: Place.order - 1},
            synchronize_session=False
        )
        db.session.commit()
        return jsonify({"message": "Place deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred while deleting the place", "error": str(e)}), 500

if __name__ == '__main__':
    # 創建數據庫表
    with app.app_context():
        db.create_all()
    app.run(debug=True)