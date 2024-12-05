from app.app import ma
from marshmallow.fields import String, validate, DateTime
from ...reply.models.reply import Reply
from app.blueprints.auth.schemas.user import UserSchema
from ..utils.messages import MESSAGES


class ReplySchema(ma.SQLAlchemyAutoSchema):
    text = String(
        required=True,
        validate=[validate.Regexp(r"^[\w\s\U00010000-\U0010ffff]*$", flags=0)],
        error_messages={MESSAGES["invalid"]: MESSAGES["invalid_msg"]},
    )
    created_at = DateTime(dump_only=True, data_key="createdAt")
    user = ma.Nested(UserSchema, only=("username", "profile_pic"))

    class Meta:
        model = Reply
        include_relationships = True
        include_fk = True
