from app.app import ma
from marshmallow import validate, validates, ValidationError
from marshmallow.fields import String, DateTime, Raw, Date
from .role_schema import RoleSchema


from .models.user import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    username = String(
        required=True,
        validate=[validate.Length(min=3)],
        error_messages={
            "required": "The name is required.",
            "invalid": "The name is invalid and needs to be a string.",
        },
    )

    @validates("username")
    def validate_username(self, username):

        if User.query.filter_by(username=username).count():
            raise ValidationError(f"Username {username} is already exists.")

    email = String(required=True, validate=[validate.Email()])

    @validates("email")
    def validate_email(self, email):

        if User.query.filter_by(email=email).count():
            raise ValidationError(f"Email {email} is already exists.")

    profile_pic = Raw(type="file", data_key="profilePic")

    city = String(
        required=True,
        validate=[validate.Length(min=3)],
        error_messages={
            "required": "City name is required.",
            "Invalid": "Invalid city name.",
        },
    )

    phone_number = String(
        required=True,
        validate=[validate.Regexp(r"^\+\d{1,3}\d{7,14}$")],
        error_messages={
            "required": "Phone number is required.",
            "Invalid": "Invalid phone number.",
        },
        data_key="phoneNumber",
    )

    date_of_birth = Date(
        required=True,
        format="%Y-%m-%d",
        error_messages={
            "required": "Date of birth is required.",
            "invalid": "Date of birth must be in the format YYYY-MM-DD.",
        },
        data_key="dob",
    )

    gender = String(
        required=True,
        validate=validate.OneOf(
            ["male", "female"]
        ),
        error_messages={
            "required": "Gender is required.",
            "invalid": "Gender must be 'Male', 'Female', or 'Other'.",
        },
    )

    @validates("phone_number")
    def validate_phone_number(self, phone_number):
        if User.query.filter_by(phone_number=phone_number).count():
            raise ValidationError(f"Phone number {phone_number} is already exists.")

    created_at = DateTime(dump_only=True, data_key="createdAt")
    # posts = ma.Nested('app.blueprints.post.post_schema.PostSchema', many=True, only=('title', 'description'))
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
                error="The password need to be at least 8 characters long, and have at least 1 of each of the following: lowercase letter, uppercase letter, special character, number.",
            )
        ],
    )
