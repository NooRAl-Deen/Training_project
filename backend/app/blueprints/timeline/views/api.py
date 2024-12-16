from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.blueprints.post.models.post import Post
from app.blueprints.post.schemas.post import PostSchema
from ...comment.models.comment import Comment
from ...comment.schemas.comment import CommentSchema
from ...like.models.like import Like
from ..utils.messages import MESSAGES
from app.utils.status_codes import SUCCESS, INTERNAL_SERVER_ERROR


timeline_api = Blueprint("timeline_api", __name__, url_prefix="/api/timeline")


@timeline_api.route("")
@jwt_required()
def get_timeline():
    user_id = get_jwt_identity()
    try:
        page = request.args.get("page", type=int, default=1)
        posts = (
            Post.query.filter(Post.user_id != user_id)
            .order_by(Post.created_at.desc())
            .paginate(page=page, per_page=5)
        )
        schema = PostSchema()
        posts_data = schema.dump(posts.items, many=True)
        for post, post_data in zip(posts, posts_data):
            recent_comments = (
                Comment.query.filter_by(post_id=post.id)
                .order_by(Comment.created_at.desc())
                .limit(3)
                .all()
            )
            comment_schema = CommentSchema(many=True)
            post_data["comments"] = comment_schema.dump(recent_comments)
            post_data["total_comment_count"] = Comment.query.filter_by(
                post_id=post.id
            ).count()
            post_data["total_likes_count"] = Like.query.filter_by(
                post_id=post.id
            ).count()
            post_data["isLiked"] = bool(
                Like.query.filter_by(post_id=post.id, user_id=user_id).first()
            )
        return {
            MESSAGES["msg"]: MESSAGES["timeline_posts"],
            MESSAGES["posts"]: posts_data,
            MESSAGES["total_pages"]: posts.pages,
            MESSAGES["current_page"]: posts.page,
        }, SUCCESS
    except Exception as e:
        return (
            jsonify(
                {
                    MESSAGES["msg"]: MESSAGES["fetching_posts_error"],
                    MESSAGES["error"]: str(e),
                }
            ),
            INTERNAL_SERVER_ERROR,
        )
