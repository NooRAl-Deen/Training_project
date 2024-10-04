from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, SubmitField
from wtforms.validators import Length, EqualTo, Email, DataRequired, Regexp, ValidationError
from ..models.user import User

class Register(FlaskForm):
    def validate_username(self, username_to_check):
        user = User.query.filter_by(username=username_to_check.data).first()
        if user:
            raise ValidationError('username already exist!')

    def validate_email(self, email_to_check):
        user = User.query.filter_by(email=email_to_check.data).first()
        if user:
            raise ValidationError('email already exist!')
    username = StringField(label='User name:', validators=[Length(min=3, max=30), DataRequired(), Regexp('^[A-Za-z0-9 ]*$', message="Username can only contain letters, numbers, and spaces.")])
    email = EmailField(label='Email:', validators=[Email(), DataRequired()])
    password = PasswordField('Password:', validators=[Length(min=6), DataRequired()])
    confirm_password = PasswordField('Confirm Password:', validators=[EqualTo('password'), Length(min=6), DataRequired()])
    submit = SubmitField('Register')