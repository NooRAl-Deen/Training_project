from app.app import db


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    slug = db.Column(db.String(30), nullable=False, unique=True)
    users = db.relationship("User", secondary="user_roles", back_populates="roles")


class UserRole(db.Model):

    __tablename__ = "user_roles"

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)