from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationship
    txn_payer = db.relationship("Transaction",
            foreign_keys='Transaction.payer_id',
            back_populates="payer",
            lazy='dynamic')

    txn_payee = db.relationship("Transaction",
            foreign_keys='Transaction.payee_id',
            back_populates="payee",
            lazy='dynamic')

    comments = db.relationship('Comment', back_populates='user',cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name
        }

    def to_dict_txn_involved(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'txn_payer': [txn.to_dict() for txn in self.txn_payer],
            'txn_payee': [txn.to_dict() for txn in self.txn_payee],

        }
