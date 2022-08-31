from app.models import db, Comment

def seed_comments():
    c1 = Comment(
        user_id = 4,
        transaction_id = 1,
        content = 'you guys hangout without me?'
    )
    c2 = Comment(
        user_id = 6,
        transaction_id = 4,
        content = 'good tenant'
    )
    c3 = Comment(
        user_id = 1,
        transaction_id = 8,
        content = 'Which restaurant?'
    )
    c4 = Comment(
        user_id = 1,
        transaction_id = 9,
        content = 'One-time only, ok?'
    )
    c5 = Comment(
        user_id = 4,
        transaction_id = 9,
        content = 'I probably also need that help! LOL'
    )
    c6 = Comment(
        user_id = 7,
        transaction_id = 3,
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