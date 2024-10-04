from app.app import db, bcrypt, login_manager
from flask_login import UserMixin
from ...post.models.post import Post

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=35), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password = db.Column(db.String(length=60), nullable=False)
    posts = db.relationship('Post', backref='user', lazy=True, cascade='all, delete')

    @property
    def password_prop(self):
        return self.password
    
    @password_prop.setter
    def password_prop(self, plain_text_password):
        self.password = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')

    def check_inserted_password(self, inserted_password):
        return bcrypt.check_password_hash(self.password, inserted_password)