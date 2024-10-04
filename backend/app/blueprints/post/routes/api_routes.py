from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app.app import db
from ..models.post import Post
from  ..post_schema import PostSchema

post_api = Blueprint('post_api', __name__, url_prefix='/api/posts')

# @post_api.route('/')
# @jwt_required()
# def get_all_posts():
#     posts = Post.query.all()
#     schema = PostSchema()
#     return {'msg': 'All posts', 'posts': schema.dump(posts, many=True)}

@post_api.route('/')
@jwt_required()
def get_user_posts():
    user_id = get_jwt_identity()  # Get the user's ID from the JWT
    try:
        posts = Post.query.filter_by(user_id=user_id).all()  # Query posts for the authenticated user
        schema = PostSchema()
        return jsonify({'msg': 'User posts', 'posts': schema.dump(posts, many=True)}), 200
    except Exception as e:
        return jsonify({'msg': 'Error fetching posts', 'error': str(e)}), 500

@post_api.route('/<int:id>')
@jwt_required()
def get_post(id):
    post = Post.query.filter_by(id=id).first()
    if not post:
        return {'msg': f'No post with id : {id}'}
    schema = PostSchema()
    return {'msg': f'Post with id : {id}', 'posts': schema.dump(post)}


@post_api.route('/', methods=['POST'])
@jwt_required()
def create_post():
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400
    schema = PostSchema()
    user_id = get_jwt_identity()
    post = schema.load(request.json)
    post.user_id = user_id
    db.session.add(post)
    db.session.commit()
    return {'msg': 'Post created', 'post': schema.dump(post)}


@post_api.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    if not request.is_json:
        return {'msg': 'Missing JSON in request'}, 400
    
    user_id = get_jwt_identity()
    post = Post.query.filter_by(id=id).first()

    if not post:
        return {'msg': f'No post with id : {id}'}

    if post.user_id != user_id:
        return {'msg' : 'Permission denied'}
    
    schema = PostSchema()
    updated_data = schema.load(request.json, partial=True)

    post.title = updated_data.title
    post.description = updated_data.description

    db.session.commit()

    return {'msg': 'Post updated', 'post': schema.dump(post)}


@post_api.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_post(id):
    post = Post.query.filter_by(id=id).first()
    if not post:
        return {'msg': f'No post with id : {id}'}
    
    user_id = get_jwt_identity()
    if post.user_id != user_id:
        return {'msg' : 'Permission denied'}
    
    db.session.delete(post)
    db.session.commit()

    return {'msg' : 'Post deleted'} 


@post_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400