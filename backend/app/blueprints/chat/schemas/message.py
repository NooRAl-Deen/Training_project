from app.app import ma
from ..models.message import Message
from marshmallow import fields
from app.blueprints.auth.models.user import User

class Message(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        include_relationships = True
        include_fk = True

