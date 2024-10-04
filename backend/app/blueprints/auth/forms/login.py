from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, SubmitField
from wtforms.validators import Length, DataRequired, Regexp

class Login(FlaskForm):
    username = StringField(label='User name:', validators=[Length(min=3, max=30), DataRequired(), Regexp('^[A-Za-z0-9 ]*$', message="Username can only contain letters, numbers, and spaces.")])
    password = PasswordField('Password:', validators=[Length(min=6), DataRequired()])
    submit = SubmitField('Login')