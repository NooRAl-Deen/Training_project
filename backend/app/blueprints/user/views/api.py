from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app.app import db
from app.blueprints.auth.models.user import User
from app.blueprints.auth.schemas.user import UserCreateSchema, UserSchema
from app.utils.decorators import auth_role
from ..utils.messages import MESSAGES
from app.utils.status_codes import UNAUTHORIZED, BAD_REQUEST, SUCCESS, NOT_FOUND

user_api = Blueprint("user_api", __name__, url_prefix="/api/users")


@user_api.route("/")
@jwt_required()
@auth_role("admin")
def get_all_users():
    users = User.query.all()
    schema = UserSchema()
    return {
        MESSAGES["msg"]: MESSAGES["all_users"],
        MESSAGES["user"]: schema.dump(users, many=True),
    }, SUCCESS


@user_api.route("/<int:id>")
@jwt_required()
def get_user(id):
    current_user_id = get_jwt_identity()
    if id != current_user_id:
        return {MESSAGES["msg"]: MESSAGES["permission_denied"]}, UNAUTHORIZED
    user = User.query.filter_by(id=id).first()
    schema = UserSchema()
    return {
        MESSAGES["msg"]: MESSAGES["user_with_id"].format(id=id),
        MESSAGES["user"]: schema.dump(user),
    }, SUCCESS


@user_api.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    if not request.is_json:
        return {MESSAGES["msg"]: "Missing JSON in request"}, BAD_REQUEST

    user_id = get_jwt_identity()
    user = User.query.filter_by(id=id).first()

    if not user:
        return {MESSAGES["msg"]: MESSAGES["no_user_with_id"].format(id=id)}, NOT_FOUND

    if user.id != user_id:
        return {MESSAGES["msg"]: MESSAGES["permission_denied"]}, UNAUTHORIZED

    schema = UserCreateSchema()
    updated_user = schema.load(request.json, partial=True)

    user.username = updated_user.username if updated_user.username else user.username
    user.email = updated_user.email if updated_user.email else user.email
    user.password = updated_user.password if updated_user.password else user.password

    db.session.commit()

    schema = UserSchema()

    return {
        MESSAGES["msg"]: MESSAGES["user_updated"],
        MESSAGES["user"]: schema.dump(user),
    }, SUCCESS


@user_api.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return {MESSAGES["msg"]: MESSAGES["no_user_with_id"].format(id=id)}, NOT_FOUND

    user_id = get_jwt_identity()
    if user.id != user_id:
        return {MESSAGES["msg"]: MESSAGES["permission_denied"]}, UNAUTHORIZED

    db.session.delete(user)
    db.session.commit()

    return {MESSAGES["msg"]: MESSAGES["user_deleted"]}, SUCCESS


@user_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), BAD_REQUEST
