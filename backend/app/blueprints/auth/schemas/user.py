from app.app import ma
from marshmallow import validate, validates, ValidationError
from marshmallow.fields import String, DateTime, Raw, Date
from .role import RoleSchema
from ..utils.messages import MESSAGES

from ..models.user import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    username = String(
        required=True,
        validate=[validate.Length(min=3)],
        error_messages={
            MESSAGES["required"]: MESSAGES["username_required_msg"],
            MESSAGES["Invalid"]: MESSAGES["username_invalid_msg"],
        },
    )

    @validates("username")
    def validate_username(self, username):

        if User.query.filter_by(username=username).count():
            raise ValidationError(
                MESSAGES["username_validation_msg"].format(username=username)
            )

    email = String(required=True, validate=[validate.Email()])

    @validates("email")
    def validate_email(self, email):

        if User.query.filter_by(email=email).count():
            raise ValidationError(MESSAGES["email_validation_msg"].format(email=email))

    profile_pic = Raw(type="file", data_key="profilePic")

    city = String(
        required=True,
        validate=[validate.Length(min=3)],
        error_messages={
            MESSAGES["required"]: MESSAGES["city_required_msg"],
            MESSAGES["Invalid"]: MESSAGES["city_invalid_msg"],
        },
    )

    phone_number = String(
        required=True,
        validate=[validate.Regexp(r"^\+\d{1,3}\d{7,14}$")],
        error_messages={
            MESSAGES["required"]: MESSAGES["phone_required_msg"],
            MESSAGES["Invalid"]: MESSAGES["phone_invalid_msg"],
        },
        data_key="phoneNumber",
    )

    date_of_birth = Date(
        required=True,
        format="%Y-%m-%d",
        error_messages={
            MESSAGES["required"]: MESSAGES["dob_required_msg"],
            MESSAGES["Invalid"]: MESSAGES["dob_invalid_msg"],
        },
        data_key="dob",
    )

    gender = String(
        required=True,
        validate=validate.OneOf(["male", "female"]),
        error_messages={
            MESSAGES["required"]: MESSAGES["gender_required_msg"],
            MESSAGES["Invalid"]: MESSAGES["gender_invalid_msg"],
        },
    )

    @validates("phone_number")
    def validate_phone_number(self, phone_number):
        if User.query.filter_by(phone_number=phone_number).count():
            raise ValidationError(
                MESSAGES["phone_validation_msg"].format(phone_number=phone_number)
            )

    created_at = DateTime(dump_only=True, data_key="createdAt")
    roles = ma.Nested(RoleSchema, many=True)

    class Meta:
        model = User
        load_instance = True
        include_relationships = True
        include_fk = True
        exclude = ["password"]


class UserCreateSchema(UserSchema):
    password_prop = String(
        required=True,
        validate=[
            validate.Regexp(
                r"^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                error=MESSAGES["password_error"],
            )
        ],
    )
