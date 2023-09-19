from flask import Flask, request, jsonify, make_response
from db import users
from bson import ObjectId
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

app.config["SECRET_KEY"] = "b71ec8224bea404e9c221bd88109da29"


@app.route("/users/signup/", methods=["POST"])
def signup():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    existing_user = users.find_one({"email": email})
    if existing_user:
        return jsonify({"msg": "User already exists!Login Instead"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    id = users.insert_one(
        {"name": name, "email": email, "password": hashed_password}
    ).inserted_id
    if id:
        token = jwt.encode(
            {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
            app.config["SECRET_KEY"],
        )

        # print(token)
        response = make_response(
            jsonify({"msg": "User registered successfully"}),
            200,
        )
        response.set_cookie(
            "token", token, expires=datetime.utcnow() + timedelta(hours=24)
        )

        return response

    return jsonify({"msg": "Sign Up failed"}), 400


@app.route("/users/login/", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    existing_user = users.find_one({"email": email})
    if not existing_user:
        return jsonify({"msg": "User does not exist!Signup instead!"}), 400

    hashed_password = existing_user["password"]
    check_password = bcrypt.check_password_hash(hashed_password, password)
    if check_password:
        token = jwt.encode(
            {"email": email, "exp": datetime.utcnow() + timedelta(hours=24)},
            app.config["SECRET_KEY"],
        )
        response = make_response(
            jsonify({"msg": "Logged in successfully"}),
            200,
        )
        response.set_cookie(
            "token", token, expires=datetime.utcnow() + timedelta(hours=24)
        )

        return response

    elif not check_password:
        return (
            jsonify({"msg": "Incorrect email or password!"}),
            400,
        )
    return jsonify({"msg": "Login failed"}), 400


@app.route("/users/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "Logout successful"})
    response.set_cookie("token", "", expires=0)
    return response


@app.route("/users/me")
def profile():
    token_cookie = request.cookies.get("token")
    if not token_cookie:
        return jsonify({"msg": "User not logged in"}), 401

    try:
        decoded = jwt.decode(
            token_cookie, app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        email = decoded.get("email")
        existing_user = users.find_one({"email": email})
        user = {"name": existing_user["name"], "email": existing_user["email"]}
        return jsonify({"user": user, "msg": "User authenticated successfully"})
    except jwt.ExpiredSignatureError:
        return jsonify({"msg": "Token has expired"}), 401

    except jwt.InvalidTokenError:
        return jsonify({"msg": "Invalid token"}), 401


if __name__ == "__main__":
    app.run(debug=True, port=8000)
