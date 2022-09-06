from flask import Blueprint
from app.forms.comment_form import CommentForm
from app.models import Transaction, Comment, db
from flask_login import current_user, login_user, logout_user, login_required


comment_routes = Blueprint('comments', __name__)


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

