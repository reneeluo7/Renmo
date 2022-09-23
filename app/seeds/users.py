from app.models import db, User


# Adds a demo user, you can add other users here if you want

u1 = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Limo')
u2 = User(
        username='marnie', email='marnie@aa.io', password='password',first_name='Marnie', last_name='Edgar')
u3 = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Brown')
u4 = User(
        username='renee-luo', email='renee@aa.io',password='password', first_name='Renee', last_name='Luo')
u5 = User(
        username='me-rachel', email='rachel@aa.io',password='password', first_name='Rachel', last_name='Green')
u6 = User(
        username='ross-G', email='ross@aa.io',password='password', first_name='Ross', last_name='Geller')
u7 = User(
        username='monica-1', email='monica@aa.io',password='password', first_name='Monica', last_name='Geller')
u8 = User(
        username='phoebebuffay', email='phoebe@aa.io',password='password', first_name='Phoebe', last_name='Buffay')
u9 = User(
        username='a-joey', email='joey@aa.io',password='password', first_name='Joey', last_name='Tribbiani')
u10 = User(
        username='chandler-bing', email='chandler@aa.io',password='password', first_name='Chandler', last_name='Bing')
    
    
users_data = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10]   

def seed_users():
    for user in users_data:
        db.session.add(user)
        db.session.commit()


    # db.session.add(u1)
    # db.session.add(u2)
    # db.session.add(u3)
    # db.session.add(u4)
    # db.session.add(u5)
    # db.session.add(u6)
    # db.session.add(u7)
    # db.session.add(u8)
    # db.session.add(u9)
    # db.session.add(u10)

    # db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
