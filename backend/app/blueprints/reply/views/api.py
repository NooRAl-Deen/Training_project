from flask import Blueprint, request
from app.app import db
from flask_jwt_extended import get_jwt_identity, jwt_required
from ...comment.models.comment import Comment
from ...reply.models.reply import Reply

replies_api = Blueprint('replies_api', __name__, url_prefix='/api/comments/<int:comment_id>/reply')

@replies_api.route('', methods=['POST'])
@jwt_required()
def add_reply(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()
    user_id = get_jwt_identity()
    if not comment:
        return {'msg': 'Comment not found.'}, 404
    
    request_data = request.json
    request_data['user_id'] = user_id
    request_data['comment_id'] = comment.id


    reply = Reply(**request_data)

    db.session.add(reply)
    db.session.commit()

    return {'msg': 'Reply added successfully.'}, 201