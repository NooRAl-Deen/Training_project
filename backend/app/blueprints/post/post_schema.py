from app.app import ma
from .models.post import Post
from marshmallow import validate, fields
from marshmallow.fields import String, Integer, Raw, DateTime, List
from app.blueprints.auth.user_schema import UserSchema

class PostSchema(ma.SQLAlchemyAutoSchema):
    images = List(Raw(type='file', data_key="images", allow_none=True))
    description = String(validate=[validate.Regexp(r'^[\w\s\U00010000-\U0010ffff]*$', flags=0)],
    error_messages={
        "invalid": "The description is invalid. It should only contain letters, numbers, spaces, or emojis."
    })

    created_at = DateTime(dump_only=True, data_key="createdAt")

    user = ma.Nested(UserSchema, only=('email', 'username', 'profile_pic'))

    class Meta:
        model = Post
        load_instance = True
        include_fk = True
        exclude = ['user_id']