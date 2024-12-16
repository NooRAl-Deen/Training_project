from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.blueprints.auth.models.user import User
from app.app import db
from ..models.message import Message
from ..schemas.message import Message as MessageSchema
from ..models.conversation import Conversation
from ..utils.messages import MESSAGES
from app.utils.status_codes import CREATED, NOT_FOUND, BAD_REQUEST

message_api = Blueprint("message_api", __name__, url_prefix="/api/message")


@message_api.route("", methods=["POST"])
@jwt_required()
def send_message():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return {MESSAGES["msg"]: MESSAGES["not_found_user"]}, NOT_FOUND
    data = request.json
    if "conversation_id" not in data:
        return {MESSAGES["msg"]: MESSAGES["no_conversation_id"]}, BAD_REQUEST
    conversation = Conversation.query.filter_by(id=data["conversation_id"]).first()
    if not conversation:
        return {MESSAGES["msg"]: MESSAGES["not_found_conversation"]}, NOT_FOUND
    data["sender_id"] = user_id
    message = Message(**data)
    db.session.add(message)
    db.session.commit()
    message_schema = MessageSchema()
    return {
        MESSAGES["msg"]: MESSAGES["message_sent"],
        MESSAGES["message"]: message_schema.dump(message),
    }, CREATED
