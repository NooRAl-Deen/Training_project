from app.app import ma
from ..models.post import Post
from marshmallow import validate
from marshmallow.fields import String, Raw, DateTime, List
from app.blueprints.auth.schemas.user import UserSchema
from ..utils.messages import MESSAGES


class PostSchema(ma.SQLAlchemyAutoSchema):
    images = List(Raw(type="file", data_key="images", allow_none=True))
    description = String(
        validate=[validate.Regexp(r"^[\w\s\U00010000-\U0010ffff]*$", flags=0)],
        error_messages={MESSAGES["invalid"]: MESSAGES["invalid_msg"]},
    )

    created_at = DateTime(dump_only=True, data_key="createdAt")

    user = ma.Nested(UserSchema, only=("id", "email", "username", "profile_pic"))

    class Meta:
        model = Post
        load_instance = True
        include_fk = True
        include_relationships = True
        exclude = ["user_id"]
