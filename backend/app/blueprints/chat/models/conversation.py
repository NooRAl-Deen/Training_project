from app.app import db
from datetime import datetime

class Conversation(db.Model):
    __tablename__ = "conversations"
    id = db.Column(db.Integer, primary_key=True)
    members = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)