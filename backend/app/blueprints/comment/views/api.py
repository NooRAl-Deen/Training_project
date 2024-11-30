from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError
from ..models.comment import Comment
from app.app import db
from sqlalchemy import asc
from app.blueprints.post.models.post import Post
from ..schema.comment import CommentSchema

comments_api = Blueprint(
    "comments_api", __name__, url_prefix="/api/posts/<int:post_id>/comments"
)


@comments_api.route("")
@jwt_required()
def get_comments(post_id):
    user_id = get_jwt_identity()
    page = request.args.get("page", default=1, type=int)
    comments = (
        Comment.query.filter_by(post_id=post_id)
        .order_by(asc(Comment.created_at))
        .paginate(page=page, per_page=3)
    )
    schema = CommentSchema()
    return {
        "msg": "Post Comments",
        "comments": schema.dump(comments.items, many=True),
        "total_comments": comments.total,
        "current_page": comments.page,
        "per_page": comments.per_page,
    }, 200


@comments_api.route("/<int:comment_id>")
@jwt_required()
def get_comment(post_id, comment_id):
    user_id = get_jwt_identity()
    comment = Comment.query.filter_by(id=comment_id).first()
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return {"msg": "Post not found."}, 404

    if not comment:
        return {"msg": "Comment not found."}, 404

    print(comment.replies)
    comment_schema = CommentSchema()

    return {
        "msg": "Comment found.",
        "comment": comment_schema.dump(comment),
    }, 200


@comments_api.route("", methods=["POST"])
@jwt_required()
def add_comment(post_id):
    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=post_id).first()
    if not post:
        return {"msg": "Post not found."}, 404
    input_data = request.json
    input_data["user_id"] = user_id
    input_data["post_id"] = post.id
    comment_schema = CommentSchema()
    comment_data = comment_schema.load(input_data)
    comment = Comment(**comment_data)
    db.session.add(comment)
    db.session.commit()
    return {
        "msg": "Comment added successfuly.",
        "comment": comment_schema.dump(comment),
    }, 201


@comments_api.route("/<int:comment_id>", methods=["PATCH"])
@jwt_required()
def edit_comment(post_id, comment_id):
    user_id = get_jwt_identity()
    comment = Comment.query.filter_by(id=comment_id).first()
    post = Post.query.filter_by(id=post_id).first()
    if not post:
        return {"msg": "Post not found."}, 404
    if not comment:
        return {"msg": "Comment not found."}, 404
    if comment.user_id != user_id:
        return {"msg": "Permission denied."}, 401
    input_data = request.json
    input_data["user_id"] = comment.user_id
    input_data["post_id"] = comment.post_id
    comment_schema = CommentSchema()
    comment_data = comment_schema.load(input_data)
    comment.text = comment_data['text']
    db.session.commit()
    return {
        "msg": "Comment edit successfuly.",
        "comment": comment_schema.dump(comment),
    }, 201


@comments_api.route("/<int:comment_id>", methods=["DELETE"])
@jwt_required()
def delete_comment(post_id, comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()

    if not comment:
        return {"msg": "Comment not found"}, 404
    user_id = get_jwt_identity()

    if comment.user_id != user_id:
        return {"msg": "Permision denied"}, 401

    if comment.post_id != post_id:
        return {"msg": "Comment not for this post"}, 403

    db.session.delete(comment)
    db.session.commit()

    return {"msg": "Post deleted successfully"}


@comments_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
