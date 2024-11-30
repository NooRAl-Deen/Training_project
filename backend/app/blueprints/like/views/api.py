from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.app import db
from ...post.models.post import Post
from ...like.models.like import Like

likes_api = Blueprint('likes_api', __name__, url_prefix='/api/posts/<int:post_id>/likes')

@likes_api.route('', methods=['POST'])
@jwt_required()
def toggle_like(post_id):
    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id).first()
    like = Like.query.filter_by(post_id=post_id, user_id=user_id).first()
    if not post:
        return {"msg": "Post not found."}, 404
    
    if like:
        db.session.delete(like)
        db.session.commit()
        return {"msg": "Unliked successfully."}, 201
    
    like = Like(post_id=post_id, user_id=user_id)
    db.session.add(like)
    db.session.commit()

    return {"msg": "Liked successfully."}, 201