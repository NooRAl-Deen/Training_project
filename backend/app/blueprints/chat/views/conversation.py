from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from sqlalchemy import func
from app.app import db
from app.utils.status_codes import BAD_REQUEST
from ..schemas.conversation import ConversationSchema
from ..models.conversation import Conversation
from ..utils.messages import MESSAGES
from ..models.message import Message
from ..schemas.message import Message as MessageSchema
from app.utils.status_codes import (
    CREATED,
    NOT_FOUND,
    BAD_REQUEST,
    SUCCESS,
    UNAUTHORIZED,
)

conversation_api = Blueprint(
    "conversation_api", __name__, url_prefix="/api/conversation"
)


@conversation_api.route("")
@jwt_required()
def get_user_conversations():
    user_id = get_jwt_identity()
    conversations = Conversation.query.filter(
        func.json_contains(Conversation.members, str(user_id))
    ).all()

    conversation_schema = ConversationSchema(many=True, context={"user_id": user_id})
    return {
        MESSAGES["msg"]: MESSAGES["conversation_retrived_successfuly"],
        MESSAGES["conversations"]: conversation_schema.dump(conversations),
    }, SUCCESS


@conversation_api.route("/<int:conversation_id>")
@jwt_required()
def get_conversation_messages(conversation_id):
    user_id = get_jwt_identity()
    conversation = Conversation.query.filter_by(id=conversation_id).first()
    if not conversation:
        return {MESSAGES["msg"]: MESSAGES["not_found_conversation"]}, NOT_FOUND
    if user_id not in conversation.members:
        return {MESSAGES["msg"]: MESSAGES["permission_denied"]}, UNAUTHORIZED
    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    message_schema = MessageSchema(many=True)
    conversation_schema = ConversationSchema(context={"user_id": user_id})
    return {
        MESSAGES["msg"]: MESSAGES["messages_retrived_successfuly"],
        MESSAGES["messages"]: message_schema.dump(messages),
        MESSAGES["conversations"]: conversation_schema.dump(conversation),
    }, SUCCESS


@conversation_api.route("", methods=["POST"])
@jwt_required()
def create_new_conversation():
    user_id = get_jwt_identity()
    if not user_id:
        return {MESSAGES["msg"]: MESSAGES["no_user_id"]}, NOT_FOUND
    if not request.json:
        return {MESSAGES["msg"]: MESSAGES["no_data"]}, BAD_REQUEST
    data = request.json
    data["members"].append(user_id)
    print(data)
    conversation_schema = ConversationSchema()
    conversation_data = conversation_schema.load(data)
    conversation = Conversation(members=conversation_data.members)
    db.session.add(conversation)
    db.session.commit()

    return {
        MESSAGES["msg"]: MESSAGES["conversation_created"],
        MESSAGES["conversation"]: conversation_schema.dump(conversation),
    }, CREATED


@conversation_api.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), BAD_REQUEST
