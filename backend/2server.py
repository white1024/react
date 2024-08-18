# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_planner.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
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
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/places', methods=['GET', 'POST'])
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)