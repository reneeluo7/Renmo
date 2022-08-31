from .db import db
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    payer_id = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    payee_id = db.Column(db.Integer, db.ForeignKey("users.id"),nullable=False)
    amount = db.Column(db.Float(precision=2, asdecimal=False), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    pending = db.Column(db.Boolean, nullable=False)
    privacy = db.Column(db.String, default='public')
    note = db.Column(db.Text(300), nullable=False)
    category = db.Column(db.String, nullable=False)

     #relationship goes here
    payer = db.relationship("User",
        foreign_keys=[payer_id],
        back_populates="txn_payer")
    
    payee = db.relationship("User",
        foreign_keys=[payee_id],
        back_populates="txn_payee")

    comments = db.relationship("Comment",
        back_populates="transaction", cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'payer_id': self.payer_id,
            'payee_id': self.payee_id,
            'amount': self.amount,
            'created_at': self.created_at,
            'pending': self.pending,
            'privacy': self.privacy,
            'note': self.note
        }

    def to_dict_with_users(self):
        return {
            'id': self.id,
            'payer': self.payer.to_dict(),
            'payee': self.payee.to_dict(),
            'amount': self.amount,
            'created_at': self.created_at,
            'pending': self.pending,
            'privacy': self.privacy,
            'note': self.note
        }