from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField
from wtforms.validators import DataRequired, NumberRange, Length


class TransactionForm(FlaskForm):
    note = StringField('note', validators=[DataRequired( message='Note is required'), Length(min=1, max=150, message='Limit 300 characters')] )
    amount = DecimalField('amount', validators=[DataRequired(), NumberRange(
        min=0, max=3000, message='Enter a value between $0 to $3000')])
    pending = BooleanField('pending', validators=[DataRequired( message='Pending is required')])
    privacy = StringField('privacy')
    category = StringField('category', validators=[DataRequired( message='Category type is required')])