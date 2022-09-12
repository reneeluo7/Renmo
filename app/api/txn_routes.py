from datetime import datetime
from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import Transaction , Comment ,db ,User
from sqlalchemy import or_, desc
from app.forms import TransactionForm
from .auth_routes import validation_errors_to_error_messages



transaction_routes = Blueprint('transactions', __name__)

#Get current user all completed txns not declined
@transaction_routes.route('/')
@login_required
def get_completed_txns():
    txns = Transaction.query.filter(or_(Transaction.payer_id == current_user.id, Transaction.payee_id == current_user.id), Transaction.pending.is_(False), Transaction.category !='Declined').order_by(desc(Transaction.created_at)).all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}

#Get current user incomplete txns
@transaction_routes.route('/incomplete')
@login_required
def get_incomplete_txns():
    txns = Transaction.query.filter(or_(Transaction.payer_id == current_user.id, Transaction.payee_id == current_user.id), Transaction.pending.is_(True)).all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}



#Get other user all public and completed txns
@transaction_routes.route('/u/<int:id>')
@login_required
def get_other_user_txns(id):
    txns = Transaction.query.filter(or_(Transaction.payer_id == id, Transaction.payee_id == id), Transaction.pending.is_(False),Transaction.privacy == "public", Transaction.category !='Declined').order_by(desc(Transaction.created_at)).all()

    return {'transactions':[txn.to_dict_users_comments() for txn in txns]}


#Create a transaction
@transaction_routes.route('/pay/<int:userid>', methods=['POST'])
@login_required
def initiate_txn(userid):
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        category = form.data['category']
        if category == 'pay':
            payer = current_user.id
            payee = userid
            pay_pending=False
        else:
            payer = userid
            payee = current_user.id
            pay_pending=True


        transaction = Transaction(
            amount=form.data['amount'],
            note=form.data['note'],
            pending=pay_pending,
            privacy=form.data['privacy'],
            category=form.data['category'],
            payer_id=payer,
            payee_id=payee
           
        )
        db.session.add(transaction)
        db.session.commit()
       
        return {"transaction": transaction.to_dict_users_comments() }
    # print("xxxxxxxxx", form.errors)
    return {"errors": (form.errors)}, 401



# Edit a pending request transaction    
@transaction_routes.route('/<int:txnid>', methods=['PUT'])
@login_required
def edit_txn(txnid):
    transaction = Transaction.query.get(txnid)

    if transaction.pending == False:
        return {"message": "This transaction has completed, can not be edited."}
    elif transaction.payee_id != current_user.id:
         return {"message": "You are not allowed to edit this transaction."}
        
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        transaction.amount=form.data['amount']
        transaction.note=form.data['note']
        transaction.privacy=form.data['privacy']
        transaction.pending=True
        transaction.category='request'
        # transaction.update_at=datetime.utcnow()
        transaction.created_at=datetime.utcnow()
        
        db.session.commit()
       
        return {'transaction': transaction.to_dict_users_comments()}

    return {'errors': form.errors}, 401


# Close pending transaction
@transaction_routes.route('/<int:txnid>/close', methods=['PUT'])
@login_required
def close_pending_txn(txnid):
    transaction = Transaction.query.get(txnid)
    if not transaction:
        return {"message": "This transaction does not exist."}
    elif transaction.payer_id != current_user.id:
         return {"message": "You are not allowed to edit this transaction."}
    
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        transaction.pending=False
        transaction.category=form.data['category']
        transaction.created_at=datetime.utcnow()

        db.session.commit()

        return {'transaction': transaction.to_dict_users_comments()}
    
    return {'errors': form.errors}, 401



# Cancel a pending request transaction   
@transaction_routes.route('/<int:txnid>', methods=['DELETE'])
@login_required
def cancel_txn(txnid):
    transaction = Transaction.query.get(txnid)

    if transaction.pending == False:
        return {"message": "This transaction has completed, can not be edited."}
    elif transaction.payee_id != current_user.id:
         return {"message": "You are not allowed to edit this transaction."}

    db.session.delete(transaction)
    db.session.commit()
    return {'message': 'Transaction Deleted'}