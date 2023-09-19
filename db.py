from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://Shaunak:shaunakraiker@cluster0.subrau2.mongodb.net/?retryWrites=true&w=majority"
try:
    client = pymongo.MongoClient(CONNECTION_STRING)
    print('Connected to the DB!')
    db = client['user_details']
    users = db.users
except:
    print('Unable to connect to the DB')