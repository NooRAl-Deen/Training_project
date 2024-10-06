from app.app import ma
from .models.post import Post
from marshmallow import validate, fields
from marshmallow.fields import String, Integer
from app.blueprints.auth.user_schema import UserSchema

class PostSchema(ma.SQLAlchemyAutoSchema):
    title = String(required=True, validate=[validate.Length(min=3), validate.Regexp('^[A-Za-z0-9 ]*$')], error_messages={
        "required": "The title is required.",
        "invalid": "The title is invalid and needs to be a string or numbers."
    })
    description = String(validate=[validate.Regexp('^[A-Za-z0-9 ]*$')], error_messages={
        "invalid": "The description is invalid and needs to be a string or numbers."
    })

    user = ma.Nested(UserSchema, only=('email', 'username'))

    class Meta:
        model = Post
        load_instance = True
        include_fk = True
        exclude = ['user_id']