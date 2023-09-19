from flask import Flask,request,jsonify,make_response
from db import admin
from db import appointments
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])
bcrypt = Bcrypt(app)
app.config["SECRET_KEY"]="b71ec8224bea404e9c221bd88109da29"

@app.route("/admin/signup",methods=["POST"])
def signup():
    #for now educational certificate not taken into account
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    age=request.json["age"]
    gender=request.json["gender"]
    phoneno=request.json["phoneno"]
    role=request.json["role"]
    city=request.json["city"]
    casespec=request.json["casespec"]
    experience=request.json["experience"]
    language=request.json["language"]
    fees=request.json["fees"]
    reviews=request.json["reviews"]
    existing_user = admin.find_one({"email": email})
    if existing_user:
        return jsonify({"success":False,"msg": "User already exists!Login Instead"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    id = admin.insert_one(
        {"name": name, "email": email, "password": hashed_password,"age":age,"gender":gender,"phoneno":phoneno,"role":role,"city":city,"casespec":casespec,"experience":experience,"language":language,"fees":fees,"reviews":reviews,"cases_won":0,"cases_lost":0}
    ).inserted_id
    if id:
        token = jwt.encode(
            {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
            app.config["SECRET_KEY"],
        )
        response = make_response(
            jsonify({"success":True,"msg": "User registered successfully","token":token}),
            200,
        )
        response.set_cookie(
            "token",
            token,
            expires=datetime.utcnow() + timedelta(hours=24),
            samesite="None",  # Set Same-Site attribute
            secure=True,  # Ensure cookies are only sent over HTTPS
        )
        return response
    return jsonify({"success":False,"msg": "Sign Up failed"}), 400

@app.route("/admin/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    existing_user = admin.find_one({"email": email})
    if not existing_user:
        return jsonify({"success":False,"msg": "User does not exist!Signup instead!"}), 400

    hashed_password = existing_user["password"]
    check_password = bcrypt.check_password_hash(hashed_password, password)
    if check_password:
        token = jwt.encode(
            {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
            app.config["SECRET_KEY"],
        )
        response = make_response(
            jsonify({"success":True,"msg": "Logged in successfully","token":token}),
            200,
        )
        response.set_cookie(
            "token", token, expires=datetime.utcnow() + timedelta(hours=24)
        )
        return response

    elif not check_password:
        return (
            jsonify({"success":False,"msg": "Incorrect email or password!"}),
            400,
        )
    return jsonify({"success":False,"msg": "Login failed"}), 400
@app.route("/admin/appointments", methods=["POST"])
def appointments():
    # const [email, setEmail] = useState("");
    #const [fname, setfName] = useState("");
    #const [lname, setlName] = useState("");
    #const [phoneno, setphoneno] = useState("");
    #const [caseinfo,setcaseinfo]=useState("")
    firstname=request.json["fname"]
    lastname=request.json["lname"]
    email=request.json["email"]
    phoneno=request.json["phoneno"]
    caseinfo=request.json["caseinfo"]
    id=request.json["id"]
    id=admin.insert_one(
        {"id":id,"firstname": firstname, "lastname": lastname, "email": email,"phoneno":phoneno,"caseinfo":caseinfo}
    ).inserted_id
    if id:
        return jsonify({"success":True,"msg": "Appointment booked successfully"})
    else:
        return jsonify({"success":False,"msg": "Appointment unsucessful"})

@app.route("/admin/logout", methods=["GET"])
def logout():
    response = jsonify({"success":True,"msg": "Logout successful"})
    response.set_cookie("token", "", expires=0)
    return response

@app.route("/admin/getall", methods=["GET"])
def getall():
    people=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        people.append(x)
    return jsonify({"success":True,"message": "All people received successfully", "people": people})

@app.route("/admin/getalllawyers", methods=["GET"])
def getalllawyers():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401
    lawyers=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        if x['role']=='Lawyer':
            lawyers.append(x)
    return jsonify({"success":True,"message": "All lawyers received successfully", "lawyers": lawyers})


@app.route("/admin/getallarbitrators", methods=["GET"])
def getallarbitrators():
    token_cookie = request["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401
    arbitrators=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        if x['role']=='Arbitrators':
            arbitrators.append(x)
    return jsonify({"success":True,"message": "All arbitrators received successfully", "arbitrators": arbitrators})

@app.route("/admin/getallmediators", methods=["GET"])
def getallmediators():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401
    mediators=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        if x['role']=='Mediators':
            mediators.append(x)
    return jsonify({"success":True,"message": "All mediators received successfully", "mediators": mediators})

@app.route("/admin/getallnotaries", methods=["GET"])
def getallnotaries():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401
    notaries=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        if x['role']=='Notaries':
            notaries.append(x)
    return jsonify({"success":True,"message": "All notaries received successfully", "notaries": notaries})

@app.route("/admin/getalldocumentwriters", methods=["GET"])
def getalldocumentwriters():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"msg": "User not logged in"}), 401
    documentwriters=[]
    for x in admin.find():
        x['_id'] = str(x['_id'])
        if x['role']=='Documentwriters':
            documentwriters.append(x)
    return jsonify({"success":True,"message": "All documentwriters received successfully", "documentwriters": documentwriters})

@app.route("/admin/profile",methods=["POST"])
def profile():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401

    try:
        decoded = jwt.decode(
            token_cookie, app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        email = decoded.get("email")
        existing_user = admin.find_one({"email": email})
        user = {"name": existing_user["name"], "email":existing_user["email"] ,"age":existing_user["age"],"gender":existing_user["gender"],"phoneno":existing_user["phoneno"],"role":existing_user["role"],"city":existing_user["city"],"casespec":existing_user["casespec"],"experience":existing_user["experience"],"language":existing_user["language"],"fees":existing_user["fees"],"reviews":existing_user["reviews"]}
        return jsonify({"success":True,"user": user, "msg": "User authenticated successfully"})
    except jwt.ExpiredSignatureError:
        return jsonify({"success":False,"msg": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"success":False,"msg": "Invalid token"}), 401


@app.route("/admin/deleteprofile",methods=["GET"])
def deleteprofile():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401

    try:
        decoded = jwt.decode(
            token_cookie, app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        email = decoded.get("email")
        existing_user = admin.find_one({"email": email})
        user = {"name": existing_user["name"], "email":existing_user["email"] ,"age":existing_user["age"],"gender":existing_user["gender"],"phoneno":existing_user["phoneno"],"role":existing_user["role"],"city":existing_user["city"],"casespec":existing_user["casespec"],"experience":existing_user["experience"],"language":existing_user["language"],"ratings":existing_user["ratings"],"fees":existing_user["fees"]}
        admin.delete_one(existing_user)
        response = jsonify({"success":True,"msg": "User profile has been deleted sucessfully","user":user})
        response.set_cookie("token", "", expires=0)
        return response
    except jwt.ExpiredSignatureError:
        return jsonify({"success":False,"msg": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"success":False,"msg": "Invalid token"}), 401

@app.route("/admin/cases",methods=["GET"])
def cases():
    token_cookie = request.cookies.get("token")
    if not token_cookie:
        return jsonify({"msg": "User not logged in"}), 401

    try:
        decoded = jwt.decode(
            token_cookie, app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        email = decoded.get("email")
        existing_user = admin.find_one({"email": email})
        return jsonify({"success":True,"cases_won":existing_user["cases_won"],"cases_lost":existing_user["cases_lost"]})
    except jwt.ExpiredSignatureError:
        return jsonify({"success":False,"msg": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"success":False,"msg": "Invalid token"}), 401

@app.route("/admin/updatepassword",methods=["POST"])
def updatepassword():
    token_cookie = request.json["token"]
    if not token_cookie:
        return jsonify({"success":False,"msg": "User not logged in"}), 401
    try:
        oldpassword=request.json["oldpassword"]
        newpassword=request.json["newpassword"]
        confirmpassword=request.json["confirmpassword"]
        decoded = jwt.decode(
            token_cookie, app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        email = decoded.get("email")
        existing_user=admin.find_one({"email":email})
        hashed_password = existing_user["password"]
        check_password = bcrypt.check_password_hash(hashed_password,oldpassword)
        if check_password==0:
            return jsonify({"success":False,"msg":"Please try again with the correct credentials"})   
        if newpassword!=confirmpassword:
            return jsonify({"success":False,"msg":"Please try again with the correct credentials"})    
        myquery = { "email": email}
        hashed_password = bcrypt.generate_password_hash(newpassword).decode("utf-8")
        newvalues = { "$set": { "password": hashed_password } }
        admin.update_one(myquery, newvalues)
        return jsonify({"success":True,"msg":"Password updated sucessfully"})
    except jwt.ExpiredSignatureError:
        return jsonify({"success":False,"msg": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"success":False,"msg": "Invalid token"}), 401

if __name__=='__main__':
    app.run(debug=True,port=8000)