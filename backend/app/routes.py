from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, Location

main = Blueprint('main', __name__)

@main.route('/api/locations', methods=['GET', 'POST'])
@jwt_required()
def locations():
    current_user = get_jwt_identity()

    if request.method == 'POST':
        data = request.get_json()
        new_location = Location(
            name=data['name'],
            address=data['address'],
            place_id=data['placeId'],
            order=data['order'],
            user_id=current_user
        )
        db.session.add(new_location)
        db.session.commit()
        return jsonify({'message': 'Location added successfully'}), 201

    locations = Location.query.filter_by(user_id=current_user).order_by(Location.order).all()
    return jsonify([{
        'id': loc.id,
        'name': loc.name,
        'address': loc.address,
        'placeId': loc.place_id,
        'order': loc.order
    } for loc in locations])

@main.route('/api/locations/reorder', methods=['PUT'])
@jwt_required()
def reorder_locations():
    current_user = get_jwt_identity()
    data = request.get_json()
    
    for index, place_id in enumerate(data['locations']):
        location = Location.query.filter_by(place_id=place_id, user_id=current_user).first()
        if location:
            location.order = index

    db.session.commit()
    return jsonify({'message': 'Locations reordered successfully'})

@main.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "CORS is working"}), 200