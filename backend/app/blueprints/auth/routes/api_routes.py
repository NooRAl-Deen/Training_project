from datetime import timedelta
import os
from flask import Blueprint, json, request, jsonify, make_response
from sqlalchemy.orm import joinedload

from ..models.role import Role
from ..user_schema import UserCreateSchema, UserSchema
from ....app import db, jwt_manager
from marshmallow import ValidationError
from ..models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_csrf_token, jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from app.utils.helpers import add_token_to_database, revoke_token, is_token_revoked
auth_api = Blueprint('auth_api', __name__, url_prefix='/api')

@auth_api.route('/register', methods=['POST'])
def register():
    print(request.get_json())
    user_data = request.get_json()

    if not user_data:
        return {'msg': 'No input data provided'}, 400

    required_fields = ['username', 'email', 'password_prop', 'phoneNumber', 'gender', 'dob', 'city']
    for field in required_fields:
        if field not in user_data:
            return {'msg': f'Missing field: {field}'}, 400

    schema = UserCreateSchema()
    user = schema.load(user_data)

    default_role = Role.query.filter_by(slug='user').first()
    if not default_role:
        return {'msg': 'Default role not found'}, 400  

    user.roles.append(default_role)
    db.session.add(user)
    db.session.commit()

    schema = UserSchema()

    return {'msg': 'User created', 'user': schema.dump(user)}, 201  


@auth_api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400
    
    username = request.json.get('username')
    password_prop = request.json.get('password_prop')

    if not username or not password_prop:
        return {'msg': 'Missing username or password'}, 400
    
    user = User.query.options(joinedload(User.roles)).filter_by(username=username).first()

    if not user or not user.check_inserted_password(inserted_password=password_prop):
        return {'msg': 'Wrong username or password'}, 400
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)


    
    schema = UserSchema()
    user_data = schema.dump(user)
    print(user_data)
    add_token_to_database(access_token)
    add_token_to_database(refresh_token)
    roles = [role['slug'] for role in user_data.get('roles', [])]
    minimal_user_data = {
        'email': user_data.get('email'),
        'username': user_data.get('username'), 
        'roles':roles,
        'phoneNumber': user_data.get('phoneNumber'), 
        'gender': user_data.get('gender'), 
        'dob': user_data.get('dob'), 
        'city': user_data.get('city'),
        'profilePic': user_data.get('profilePic')
    }
    response = make_response({'user': minimal_user_data})
    set_access_cookies(response, access_token, max_age=timedelta(days=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))))
    set_refresh_cookies(response, refresh_token, max_age=timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES'))))
    response.headers['csrf_access_token'] = get_csrf_token(access_token)
    response.headers['csrf_refresh_token'] = get_csrf_token(refresh_token)
    return response

@auth_api.route('/logout', methods=['POST'])
def logout():
    

    response = make_response({'msg': 'Logged out successfully'})
    unset_jwt_cookies(response)
    
    return response

@auth_api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    response = jsonify(access_token=new_access_token)
    set_access_cookies(response, new_access_token, max_age=timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))))
    response.headers['csrf_access_token'] = get_csrf_token(new_access_token)
    return response

@auth_api.route('/revoke_access', methods=['DELETE'])
@jwt_required()
def revoke_access():
    jti = get_jwt()['jti']
    user_id = get_jwt_identity()
    revoke_token(jti, user_id)
    return {'msg': 'Token revoked'}

@auth_api.route('/revoke_refresh', methods=['DELETE'])
@jwt_required(refresh=True)
def revoke_refresh():
    jti = get_jwt()['jti']
    user_id = get_jwt_identity()
    revoke_token(jti, user_id)
    return {'msg': 'Refresh token revoked'}


# @jwt_manager.token_in_blocklist_loader
# def check_if_token_revoked(jwt_headers, jwt_payload):
#     try:
#         return is_token_revoked(jwt_payload)
#     except Exception:
#         return True
    

@jwt_manager.user_lookup_loader
def load_user(jwt_headers, jwt_payload):
    user_id = jwt_payload['user_id']
    return User.query.get(user_id)






@auth_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400