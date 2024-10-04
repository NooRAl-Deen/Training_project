from flask import Blueprint, request, jsonify
from ..user_schema import UserCreateSchema, UserSchema
from ....app import db, jwt_manager
from marshmallow import ValidationError
from ..models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, jwt_required, get_jwt_identity, get_current_user
from app.utils.helpers import add_token_to_database, revoke_token, is_token_revoked
auth_api = Blueprint('auth_api', __name__, url_prefix='/api')

@auth_api.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400

    schema = UserCreateSchema()
    user = schema.load(request.json)
    db.session.add(user)
    db.session.commit()

    schema = UserSchema()

    return {'msg': 'User created', 'user': schema.dump(user)}

@auth_api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400
    
    username = request.json.get('username')
    password_prop = request.json.get('password_prop')

    if not username or not password_prop:
        return {'msg': 'Missing username or password'}, 400
    
    user = User.query.filter_by(username=username).first()

    if not user or not user.check_inserted_password(inserted_password=password_prop):
        return {'msg': 'Wrong username or password'}, 400
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    add_token_to_database(access_token)
    add_token_to_database(refresh_token)

    return {'access_token': access_token, 'refresh_token': refresh_token}

@auth_api.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token)

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


@jwt_manager.token_in_blocklist_loader
def check_if_token_revoked(jwt_headers, jwt_payload):
    try:
        return is_token_revoked(jwt_payload)
    except Exception:
        return True
    

@jwt_manager.user_lookup_loader
def load_user(jwt_headers, jwt_payload):
    user_id = jwt_payload['user_id']
    return User.query.get(user_id)






@auth_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400