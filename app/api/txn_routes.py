from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Transaction , Comment ,db ,User
from sqlalchemy import or_

transaction_routes = Blueprint('transactions', __name__)

#Get current user all completed txns
@transaction_routes.route('/')
@login_required
def get_completed_txns():
    txns = Transaction.query.filter(or_(Transaction.payer_id == current_user.id, Transaction.payee_id == current_user.id), Transaction.pending.is_(False)).all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}

#Get current user incompleted txns
@transaction_routes.route('/incomplete')
@login_required
def get_incomplete_txns():
    txns = Transaction.query.filter(or_(Transaction.payer_id == current_user.id, Transaction.payee_id == current_user.id), Transaction.pending.is_(True)).all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}



#Get other user all public and completed txns
@transaction_routes.route('/u/<int:id>')
@login_required
def get_other_user_txns(id):
    txns = Transaction.query.filter(or_(Transaction.payer_id == id, Transaction.payee_id == id), Transaction.pending.is_(False),Transaction.privacy == "public").all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}
