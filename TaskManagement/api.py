from flask import Flask, jsonify, request, render_template
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_cors import CORS 

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Tasker"
mongo = PyMongo(app)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if username and password are provided
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Check if username exists in the database
    existing_user = mongo.db.Login_Details.find_one({'username': username})
    if not existing_user:
        return jsonify({'error': 'Invalid username'}), 401

    # Check if password matches
    if existing_user['password'] != password:
        return jsonify({'error': 'Invalid password'}), 401

    return jsonify({'message': 'Login successful'}), 200

@app.route('/signup', methods=['POST'])
def signup():
            username = request.json.get('username')
            password = request.json.get('password')
            major = request.json.get('major')
            uni = request.json.get('uni')

            # Check if username and passwor  d are provided
            if not username or not password:
                return jsonify({'error': 'Username and password are required'}), 400

            # Check if username already exists in the database
            existing_user = mongo.db.Login_Details.find_one({'username': username})
            if existing_user:
                return jsonify({'error': 'Username already exists'}), 409

            # Create a new user document
            new_user = {
                "username": username,
                "password": password,
                "major": major,
                "uni": uni
            }

            # Insert the new user document into the database
            mongo.db.Login_Details.insert_one(new_user)

            return jsonify({'message': 'Signup successful'}), 201
            
@app.route('/users')
def users():
      users=mongo.db.Login_Details.find()
      return dumps(users)

""" Tester GET route
@app.route('/scam', methods=['GET'])
def scam():
      return jsonify({"You": "is SCAm"})
"""

if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)
