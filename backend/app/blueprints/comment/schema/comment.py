from app.app import ma
from marshmallow.fields import String, validate, DateTime

from app.blueprints.reply.schema.reply import ReplySchema
from ..models.comment import Comment
from app.blueprints.auth.user_schema import UserSchema

class CommentSchema(ma.SQLAlchemyAutoSchema):
    text = String(required=True, validate=[validate.Regexp(r'^[\w\s\U00010000-\U0010ffff]*$', flags=0)],
    error_messages={
        "invalid": "The description is invalid. It should only contain letters, numbers, spaces, or emojis."
    })
    created_at = DateTime(dump_only=True, data_key="createdAt")
    user = ma.Nested(UserSchema, only=('username',"profile_pic"))
    replies = ma.Nested(ReplySchema, many=True)

    class Meta:
        model = Comment
        include_relationships = True
        include_fk = True