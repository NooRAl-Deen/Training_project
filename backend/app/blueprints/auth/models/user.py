from datetime import datetime, timezone

from app.app import db, bcrypt, login_manager
from flask_login import UserMixin
from ...post.models.post import Post
from ...comment.models.comment import Comment
from ...reply.models.reply import Reply
from ...like.models.like import Like
from .role import Role, UserRole


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):

    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=35), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password = db.Column(db.String(length=60), nullable=False)
    profile_pic = db.Column(
        db.String(length=200), nullable=False, default="static/uploads/user.jpg"
    )
    phone_number = db.Column(db.String(length=15), nullable=False)
    gender = db.Column(db.String(length=10), nullable=False)
    city = db.Column(db.String(length=20), nullable=False)
    date_of_birth = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    posts = db.relationship("Post", backref="user", lazy=True, cascade="all, delete")
    comments = db.relationship("Comment", backref="user", lazy=True, cascade="all, delete")
    replies = db.relationship("Reply", backref="user", lazy=True, cascade="all, delete")
    likes = db.relationship("Like", backref="user", lazy=True, cascade="all, delete")
    roles = db.relationship("Role", secondary="user_roles", back_populates="users")

    @property
    def password_prop(self):
        return self.password

    @password_prop.setter
    def password_prop(self, plain_text_password):
        self.password = bcrypt.generate_password_hash(plain_text_password).decode(
            "utf-8"
        )

    def check_inserted_password(self, inserted_password):
        return bcrypt.check_password_hash(self.password, inserted_password)

    def has_role(self, role):
        return bool(
            Role.query.join(Role.users)
            .filter(User.id == self.id)
            .filter(Role.slug == role)
            .count()
            == 1
        )
