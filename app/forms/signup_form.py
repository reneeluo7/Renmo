from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_password(form, field):
    # Checking if password is longer than 5
    password = field.data
    
    if len(password) < 6 :
        raise ValidationError('Password should be longer than 5')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(message="First Name is required")])
    last_name = StringField('last_name', validators=[DataRequired(message="Last Name is required")])
    username = StringField(
        'username', validators=[DataRequired(message="UserName is required"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Email is required"), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(message="Password is required"), valid_password])
