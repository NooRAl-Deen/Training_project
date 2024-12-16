from app.app import db
from .conversation import Conversation
from app.blueprints.auth.models.user import User
from datetime import datetime

class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)  
    send_at = db.Column(db.DateTime, default=datetime.now)
    sender = db.relationship('User', backref='messages')
    conversation = db.relationship('Conversation', backref='messages')