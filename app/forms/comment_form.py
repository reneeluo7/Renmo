from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextAreaField("Description", validators=[DataRequired(message="Content is required")])
    submit = SubmitField("Submit")