import os
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app.app import db
from app.utils.images_validation import allowed_file, generate_unique_filename
from ..models.post import Post
from ..schemas.post import PostSchema
from ...comment.models.comment import Comment
from ...comment.schemas.comment import CommentSchema
from ...like.models.like import Like
from werkzeug.utils import secure_filename

post_api = Blueprint("post_api", __name__, url_prefix="/api/posts")


@post_api.route("/")
@jwt_required()
def get_user_posts():
    user_id = get_jwt_identity()
    try:
        page = request.args.get("page", type=int, default=1)
        posts = (
            Post.query.filter_by(user_id=user_id)
            .order_by(Post.id.desc())
            .paginate(page=page, per_page=5)
        )
        schema = PostSchema()
        posts_data = schema.dump(posts.items, many=True)
        for post, post_data in zip(posts, posts_data):
            recent_comments = (
                Comment.query.filter_by(post_id=post.id)
                .order_by(Comment.created_at)
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
            "msg": "User posts",
            "posts": posts_data,
            "total_pages": posts.pages,
            "current_page": posts.page,
        }, 200
    except Exception as e:
        return jsonify({"msg": "Error fetching posts", "error": str(e)}), 500


@post_api.route("/<int:id>")
@jwt_required()
def get_post(id):
    user_id = get_jwt_identity()
    try:

        post = Post.query.filter_by(id=id).first()

        if not post:
            return jsonify({"msg": f"No post with id : {id} for user {user_id}"}), 404

        post_schema = PostSchema()
        post_data = post_schema.dump(post)

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
        post_data["total_likes_count"] = Like.query.filter_by(post_id=post.id).count()
        post_data["isLiked"] = bool(
            Like.query.filter_by(post_id=post.id, user_id=user_id).first()
        )

        return {"msg": f"Post with id : {id}", "post": post_data}, 200

    except Exception as e:
        return jsonify({"msg": "Error fetching post", "error": str(e)}), 500


@post_api.route("/", methods=["POST"])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()

    schema = PostSchema()
    upload_paths = []

    if "files[]" in request.files:
        files = request.files.getlist("files[]")

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                unique_filename = generate_unique_filename(filename)
                upload_path = os.path.join("static/uploads", unique_filename)
                file.save(upload_path)
                upload_paths.append(upload_path)
    try:
        post_data = schema.load(
            {
                "description": request.form.get("description"),
                "images": upload_paths if upload_paths else [],
            }
        )
    except ValidationError as err:
        return jsonify(err.messages), 400

    post = Post(description=post_data.description, images=post_data.images)
    post.user_id = user_id

    db.session.add(post)
    db.session.commit()

    return {"msg": "Post created successfully", "post": schema.dump(post)}, 201


@post_api.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_post(id):

    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=id).first()

    if not post:
        return {"msg": f"No post with id : {id}"}, 404

    if post.user_id != user_id:
        return {"msg": "Permission denied"}, 403

    upload_paths = []

    if "files[]" in request.files:
        files = request.files.getlist("files[]")
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                unique_filename = generate_unique_filename(filename)
                upload_path = os.path.join("static/uploads", unique_filename)
                file.save(upload_path)
                upload_paths.append(upload_path)

    schema = PostSchema()
    try:
        post_data = schema.load(request.form)
    except ValidationError as err:
        return jsonify(err.messages), 400

    post.description = (
        post_data.description if post_data.description else post.description
    )
    post.images = upload_paths if upload_paths else post.images

    db.session.commit()

    return {"msg": "Post updated successfully", "post": schema.dump(post)}, 200


@post_api.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_post(id):
    post = Post.query.filter_by(id=id).first()
    if not post:
        return {"msg": f"No post with id : {id}"}

    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return {"msg": "Permission denied"}

    db.session.delete(post)
    db.session.commit()

    return {"msg": "Post deleted"}


@post_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
