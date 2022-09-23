from app.models import db, Comment
from .users import u1, u2, u3, u4, u5, u6, u7, u8, u9, u10
from .transactions import t1, t2, t3, t4, t5, t6, t7, t8, t9, t10

def seed_comments():
    c1 = Comment(
        user = u4,
        transaction = t1,
        content = 'you guys hangout without me?'
    )
    c2 = Comment(
        user = u6,
        transaction = t4,
        content = 'good tenant'
    )
    c3 = Comment(
        user = u1,
        transaction = t8,
        content = 'Which restaurant?'
    )
    c4 = Comment(
        user = u1,
        transaction = t9,
        content = 'One-time only, ok?'
    )
    c5 = Comment(
        user = u4,
        transaction = t9,
        content = 'I probably also need that help! LOL'
    )
    c6 = Comment(
        user = u7,
        transaction = t3,
        content = 'I wish I had time to join you'
    )


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.add(c6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()