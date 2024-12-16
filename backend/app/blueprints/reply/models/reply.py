from app.app import db
from datetime import datetime

class Reply(db.Model):
    __tablename__ = "replies"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"),  nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id', ondelete="CASCADE"),  nullable=False)