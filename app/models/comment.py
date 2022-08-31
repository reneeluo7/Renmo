from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'), nullable=False)

    #relationship
    user = db.relationship('User', back_populates='comments')
    transaction = db.relationship('Transaction', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'transaction_id': self.transaction_id
        }


    def to_dict_user_txn(self):
        return {
            'id': self.id,
            'content': self.content,
            'user': self.user.to_dict(),
            'transaction': self.transaction.to_dict()
        }
