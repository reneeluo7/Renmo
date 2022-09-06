from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextAreaField("Description", validators=[DataRequired(message="Description is required")])
    submit = SubmitField("Submit")