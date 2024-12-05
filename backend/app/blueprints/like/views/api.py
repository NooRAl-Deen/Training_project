from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.app import db
from ...post.models.post import Post
from ...like.models.like import Like
from ..utils.messages import MESSAGES
from app.utils.status_codes import CREATED, NOT_FOUND

likes_api = Blueprint(
    "likes_api", __name__, url_prefix="/api/posts/<int:post_id>/likes"
)


@likes_api.route("", methods=["POST"])
@jwt_required()
def toggle_like(post_id):
    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id).first()
    like = Like.query.filter_by(post_id=post_id, user_id=user_id).first()
    if not post:
        return {MESSAGES["msg"]: MESSAGES["post_not_found"]}, NOT_FOUND

    if like:
        db.session.delete(like)
        db.session.commit()
        return {MESSAGES["msg"]: MESSAGES["unliked"]}, CREATED

    like = Like(post_id=post_id, user_id=user_id)
    db.session.add(like)
    db.session.commit()

    return {MESSAGES["msg"]: MESSAGES["liked"]}, CREATED
