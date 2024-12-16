from flask import Blueprint
from app.app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.blueprints.auth.models.user import User
from app.blueprints.post.models.post import Post
from app.blueprints.comment.models.comment import Comment
from app.blueprints.like.models.like import Like
from ..utils.messages import MESSAGES
from app.utils.status_codes import NOT_FOUND, SUCCESS
from sqlalchemy import func, select

profile_activity_api = Blueprint(
    "profile_activity_api", __name__, url_prefix="/api/profile-activity"
)


@profile_activity_api.route("")
@jwt_required()
def get_profile_activity():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return {MESSAGES["msg"]: MESSAGES["user_not_found"]}, NOT_FOUND

    likes_count = (
        db.session.query(func.count(Like.id))
        .join(Post)
        .filter(Post.user_id == user_id)
        .scalar()
    )

    comments_count = (
        db.session.query(func.count(Comment.id))
        .join(Post)
        .filter(Post.user_id == user_id)
        .scalar()
    )

    return {
        MESSAGES["msg"]: MESSAGES["statics_retrived_successfuly"],
        MESSAGES["likes_count"]: likes_count,
        MESSAGES["comments_count"]: comments_count,
    }, SUCCESS
