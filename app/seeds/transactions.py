from app.models import db, Transaction, User
from datetime import datetime
from .users import u1, u2, u3, u4, u5, u6, u7, u8, u9, u10


t1 = Transaction(
        payer_id=1,
        payee_id=3,
        amount=25,
        pending=False,
        privacy='public',
        note='dinner',
        category='pay',
        created_at=datetime.fromisoformat('2022-07-11'),
        transactions_likes=[u3, u8]
    )
t2= Transaction(
        payer_id=2,
        payee_id=3,
        amount=25,
        pending=False,
        privacy='public',
        note='dinner',
        category='pay',
        created_at=datetime.fromisoformat('2022-07-12'),
        transactions_likes=[u3]
    )
t3 = Transaction(
        payer_id=4,
        payee_id=1,
        amount=8,
        pending=False,
        privacy='public',
        note='drink',
        category='pay',
        created_at=datetime.fromisoformat('2022-07-28'),
        transactions_likes=[u1]
    )
t4 = Transaction(
        payer_id=5,
        payee_id=7,
        amount=1000,
        pending=False,
        privacy='public',
        note='rent',
        category='pay',
        created_at=datetime.fromisoformat('2022-08-01'),
        transactions_likes=[u9, u6]
    )
t5 = Transaction(
        payer_id=1,
        payee_id=10,
        amount=32,
        pending=True,
        privacy='public',
        note='grocery',
        category='request',
        created_at=datetime.fromisoformat('2022-08-02'),
        
    )
t6 = Transaction(
        payer_id=9,
        payee_id=1,
        amount=10,
        pending=True,
        privacy='public',
        note='Remember the taxi?',
        category='request',
        created_at=datetime.fromisoformat('2022-08-14')
    )
t7 = Transaction(
        payer_id=6,
        payee_id=8,
        amount=20,
        pending=False,
        privacy='public',
        note='Thanks for the laundry',
        category='pay',
        created_at=datetime.fromisoformat('2022-08-15')
    )
t8 = Transaction(
        payer_id=4,
        payee_id=5,
        amount=54,
        pending=False,
        privacy='public',
        note='the restaurant is amazing',
        category='pay',
        created_at=datetime.fromisoformat('2022-08-22'),
        transactions_likes=[u4, u5, u10]
    )
t9 = Transaction(
        payer_id=1,
        payee_id=5,
        amount=34,
        pending=False,
        privacy='public',
        note='i need money to pay the bill right now',
        category='request',
        created_at=datetime.fromisoformat('2022-08-25'),
        transactions_likes=[u4, u5]
    )
t10 = Transaction(
        payer_id=3,
        payee_id=6,
        amount=40,
        pending=False,
        privacy='public',
        note='utility bills',
        category='request',
        created_at=datetime.fromisoformat('2022-08-28')
    )

txns_data = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10]

def seed_transactions():
    for t in txns_data:
        db.session.add(t)
        db.session.commit()

    # db.session.add(t1)
    # db.session.add(t2)
    # db.session.add(t3)
    # db.session.add(t4)
    # db.session.add(t5)
    # db.session.add(t6)
    # db.session.add(t7)
    # db.session.add(t8)
    # db.session.add(t9)
    # db.session.add(t10)

    # db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
