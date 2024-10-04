from app.app import ma
from marshmallow import validate, validates, ValidationError
from marshmallow.fields import String


from .models.user import User

class UserSchema(ma.SQLAlchemyAutoSchema):
    username = String(required=True, validate=[validate.Length(min=3)], error_messages={
        "required": "The name is required.",
        "invalid": "The name is invalid and needs to be a string."
    })

    @validates('username')
    def validate_username(self, username):
        # username = data.get('username')

        if User.query.filter_by(username=username).count():
            raise ValidationError(f'Username {username} is already exists.')
    

    email = String(required=True, validate=[validate.Email()])

    @validates('email')
    def validate_email(self, email):
        # email = data.get('email')

        if User.query.filter_by(email=email).count():
            raise ValidationError(f'Email {email} is already exists.')
        
    posts = ma.Nested('app.blueprints.post.post_schema.PostSchema', many=True, only=('title', 'description'))

    class Meta:
        model = User
        load_instance = True
        exclude = ['id', 'password']


class UserCreateSchema(UserSchema):
    password_prop = String(
        required=True,
        validate=[validate.Regexp(r"^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                                  error="The password need to be at least 8 characters long, and have at least 1 of each of the following: lowercase letter, uppercase letter, special character, number."
                                  )]
                      )