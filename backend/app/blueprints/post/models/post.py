from datetime import datetime
from app.app import db
from ...comment.models.comment import Comment
from ...like.models.like import Like

class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    images = db.Column(db.JSON, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comments = db.relationship("Comment", backref="post", lazy=True, cascade="all, delete")
    likes = db.relationship("Like", backref="post", lazy=True, cascade="all, delete")