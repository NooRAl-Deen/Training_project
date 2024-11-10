from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app.app import db
from app.blueprints.auth.models.user import User
from app.blueprints.auth.user_schema import UserCreateSchema, UserSchema
from app.utils.decorators import auth_role

user_api = Blueprint('user_api', __name__, url_prefix='/api/users')

@user_api.route('/')
@jwt_required()
@auth_role("admin")
def get_all_users():
    users = User.query.all()
    schema = UserSchema()
    return {'msg': 'All Users', 'user': schema.dump(users, many=True)}



@user_api.route('/<int:id>')
@jwt_required()
def get_user(id):
    current_user_id = get_jwt_identity()
    if id != current_user_id:
        return {'msg': 'Permission denied'}, 401
    user = User.query.filter_by(id=id).first()
    schema = UserSchema()
    return {'msg': f'User with id {id}', 'user': schema.dump(user)}


@user_api.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400
    
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=id).first()

    if not user:
        return {'msg': f'No user with id : {id}'}

    if user.id != user_id:
        return {'msg' : 'Permission denied'}, 401
    
    schema = UserCreateSchema()
    updated_user = schema.load(request.json, partial=True)

    user.username = updated_user.username if updated_user.username else user.username
    user.email = updated_user.email if updated_user.email else user.email
    user.password = updated_user.password if updated_user.password else user.password

    db.session.commit()

    schema = UserSchema()

    return {'msg': 'User updated', 'user': schema.dump(user)}


@user_api.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return {'msg': f'No user with id : {id}'}
    
    user_id = get_jwt_identity()
    if user.id != user_id:
        return {'msg' : 'Permission denied'}
    
    db.session.delete(user)
    db.session.commit()

    return {'msg' : 'User deleted'} 


@user_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400