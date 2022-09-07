from flask import Blueprint, redirect, request
from app.forms.comment_form import CommentForm
from app.models import Transaction, Comment, comment, db
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)

#GET
@comment_routes.route('/transactions/<int:txn_id>')
@login_required
def get_txn_comments(txn_id):
    txn = Transaction.query.get(txn_id)
    if not txn:
        return {'errors':['Transaction can not be found']},404
    comments = Comment.query.filter(Comment.transaction_id == txn_id).all()

    return {'comments': [com.to_dict() for com in comments]}



#POST
@comment_routes.route('/transactions/<int:txn_id>', methods=['POST'])
@login_required

def txn_comment(txn_id):
    # txn = Transaction.query.get(txn_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newComment = Comment(
            content=form.data['content'],
            transaction_id=txn_id,
            user_id=current_user.get_id()
        )
        
        db.session.add(newComment)
        db.session.commit()
        return {"comment": newComment.to_dict()}
       

    return {'errors': form.errors}, 401


# DELETE 
@comment_routes.route('/<int:cmtId>', methods=['DELETE'])
@login_required
def delete_comment(cmtId):
    comment = Comment.query.get(cmtId)

    if not comment:
        return {"message": "This comment does not exist."}
   

    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment Deleted'}


#PUT
@comment_routes.route('/<int:cmtId>', methods=['PUT'])
@login_required
def edit_comment(cmtId):
    comment = Comment.query.get(cmtId)

    if not comment:
        return{'message': 'This comment does not exist.'}
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.data['content']
       

        db.session.commit()

        return{'comment': comment.to_dict()}
    
    return {'errors': form.errors}, 401