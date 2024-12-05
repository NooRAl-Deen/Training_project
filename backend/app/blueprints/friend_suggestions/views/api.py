from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.blueprints.auth.models.user import User
from app.blueprints.auth.schemas.user import UserSchema
from ..utils.messages import MESSAGES
from app.utils.status_codes import SUCCESS, NOT_FOUND

friend_suggestions_api = Blueprint(
    "friend_suggestions_api", __name__, url_prefix="/api/suggest"
)


@friend_suggestions_api.route("")
@jwt_required()
def suggest():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return {MESSAGES["msg"]: MESSAGES["user_not_found"]}, NOT_FOUND
    users = (
        User.query.filter(User.city == user.city, User.id != user_id)
        .order_by(User.created_at.desc())
        .limit(5)
        .all()
    )
    filterd_users = [
        {
            "id": user.id,
            "username": user.username,
            "city": user.city,
            "profile_pic": user.profile_pic,
        }
        for user in users
    ]
    user_schema = UserSchema()

    return {
        MESSAGES["msg"]: MESSAGES["suggested_users_msg"],
        MESSAGES["suggested_users"]: user_schema.dump(filterd_users, many=True),
    }, SUCCESS
