from app.models import db, like

def seed_likes():
    l1 = like(
        user_id = 3,
        transaction_id = 1,
        
    )
    l2 = like(
        user_id = 9,
        transaction_id = 1,
        
    )
    l3 = like(
        user_id = 1,
        transaction_id = 7,
        
    )
    l4 = like(
        user_id = 1,
        transaction_id = 9,
        
    )
    l5 = like(
        user_id = 4,
        transaction_id = 2,
        
    )
    l6 = like(
        user_id = 7,
        transaction_id = 3,
        
    )


    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)
    db.session.add(l4)
    db.session.add(l5)
    db.session.add(l6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()