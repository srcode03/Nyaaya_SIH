from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://Shaunak:shaunakraiker@cluster0.subrau2.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
try:
    db=client['user_details']
    db2=client['admin_details']
    db3=client['appointments_details']
    users=db.users
    admin=db2.admin
    appointments=db3.appointments
except:
    print('Unable to connect to the DB')