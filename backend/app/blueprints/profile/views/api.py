from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError
from werkzeug.utils import secure_filename
from app.blueprints.auth.models.user import User
from app.blueprints.auth.schemas.user import UserSchema
import os
from app.utils.images_validation import allowed_file, generate_unique_filename
from app.app import db
from ..utils.messages import MESSAGES
from app.utils.status_codes import SUCCESS, NOT_FOUND, BAD_REQUEST

profile_api = Blueprint("profile_api", __name__, url_prefix="/api/profile")


@profile_api.route("/")
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    schema = UserSchema()
    return {
        MESSAGES["msg"]: MESSAGES["profile_for_user"],
        MESSAGES["user"]: schema.dump(user),
    }


@profile_api.route("/update-profile", methods=["PATCH"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return {MESSAGES["msg"]: MESSAGES["user_not_found"]}, NOT_FOUND

    schema = UserSchema()

    if "profilePic" in request.files:
        profile_pic = request.files["profilePic"]

        if profile_pic.filename == "":
            return {MESSAGES["msg"]: MESSAGES["no_file_selected"]}, BAD_REQUEST

        if not allowed_file(profile_pic.filename):
            return {MESSAGES["msg"]: MESSAGES["file_type_not_allowed"]}, BAD_REQUEST

        filename = secure_filename(profile_pic.filename)
        unique_filename = generate_unique_filename(filename)
        upload_path = os.path.join("static/uploads", unique_filename)
        profile_pic.save(upload_path)

        user.profile_pic = upload_path

    updated_user = schema.load(request.form, partial=True)
    user.username = updated_user.username if updated_user.username else user.username
    user.email = updated_user.email if updated_user.email else user.email
    user.phone_number = (
        updated_user.phone_number if updated_user.phone_number else user.phone_number
    )
    user.gender = updated_user.gender if updated_user.gender else user.gender
    user.city = updated_user.city if updated_user.city else user.city
    user.date_of_birth = (
        updated_user.date_of_birth if updated_user.date_of_birth else user.date_of_birth
    )

    db.session.commit()

    return {
        MESSAGES["msg"]: MESSAGES["profile_updated"],
        MESSAGES["user"]: schema.dump(user),
    }, SUCCESS


@profile_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), BAD_REQUEST
