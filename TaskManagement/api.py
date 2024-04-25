from flask import Flask, jsonify, request, render_template, redirect, url_for
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_mail import Mail, Message
from random import randint

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Tasker"

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = False
app.config["MAIK_USE_SSL"]= True
# app.config["MAIL_USERNAME"] = "your_username"
app.config["MAIL_PASSWORD"] = "enter pass"
app.config["MAIL_DEFAULT_SENDER"] = "enter email"

mongo = PyMongo(app)
CORS(app)
mail= Mail(app)


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


    return jsonify({'message': 'Login successful'+ str(existing_user["_id"])}), 200
    # return redirect(url_for('homepage', username=username))

@app.route('/homepage/<user_id>')
def homepage(username):
    tasks = mongo.db.Task_Details.find({"username ": username})

    #converting the cursor object Tasks to JSON serializable format
    task_list = [task for task in tasks]
    #print(task_list)
    return dumps(task_list)

@app.route('/signup', methods=['POST'])
def signup():
            username = request.json.get('username')
            password = request.json.get('password')
            major = request.json.get('major')
            uni = request.json.get('uni')

            # Check if username and passwor  d are provided
            if not username or not password or not major or not uni:
                return jsonify({'error': 'Username and password are required'}), 400

            #extracting 
            existing_major= mongo.db.Majors.find_one({"Major":major})
            if not existing_major:
                 new_major= mongo.db.Majors.insert_one({"Major":major})
                 major_id= new_major.inserted_id
            else:
                 major_id= existing_major['_id']

            existing_uni= mongo.db.Uni_Details.find_one({"Name":uni})
            if not existing_uni:
                 new_uni= mongo.db.Uni_Details.insert_one({"Name":uni})
                 uni_id= new_uni.inserted_id
            else:
                 uni_id= existing_uni['_id']
                 
            # Check if username already exists in the database
            existing_user = mongo.db.Login_Details.find_one({'username': username})
            if existing_user:
                return jsonify({'error': 'Username already exists'}), 409

            # Create a new user document
            new_user = {
                "username": username,
                "password": password,
                "major": major_id,
                "uni": uni_id
            }

            # Insert the new user document into the database
            mongo.db.Login_Details.insert_one(new_user)

            return jsonify({'message': 'Signup successful'}), 201
            
@app.route('/tasks/<userid>', methods=['POST'])
def add_task(userid):
                user_id = userid
                task_name = request.json.get('task_name')
                task_course = request.json.get('task_course')
                task_date= request.json.get("task_date")
                task_priority= request.json.get("task_priority")

                # Check if username, task_name, and task_description are provided
                if not user_id or not task_name or not task_course or not task_date or not task_priority:
                    return jsonify({'error': 'Username, task name, and task description are required'}), 400

                # Create a new task document
                new_task = {
                    "user_id": userid,
                    "task_name": task_name,
                    "task_course": task_course,
                    "task_duedate": task_date,
                    "task_priority": task_priority
                }

                # Insert the new task document into the database
                task=mongo.db.Task_Details.insert_one(new_task)

                return jsonify({'message': 'Task added successfully'+" "+str(task.inserted_id)}), 201


@app.route('/tasksdel/<task_id>', methods=['DELETE'])
def delete_task(task_id):
                # Check if task_id is provided
                if not task_id:
                    return jsonify({'error': 'Task ID is required'}), 400

                # Check if task_id exists in the database
                existing_task = mongo.db.Task_Details.find_one({'_id': ObjectId(task_id)})
                if not existing_task:
                    return jsonify({'error': 'Invalid task ID'}), 404

                # Delete the task document from the database
                mongo.db.Task_Details.delete_one({'_id': ObjectId(task_id)})

                return jsonify({'message': 'Task deleted successfully'}), 200

#genereating a random 4 digit OTP
otp= randint(0000,9999)
@app.route('/verify', methods=["POST"])
def verify():
    email = request.json.get('email')
    msg = Message('OTP Verification', sender="oggyonfire@gmail.com", recipients=[email])
    
    # Set the body of the email
    msg.body = f'Your OTP is: {otp}'
    
    # Send the email
    mail.send(msg)
    return jsonify("OTP sent to email")
        
@app.route("/validate", methods=["POST"])
def validate():
      user_otp= request.json.get('otp')
      if otp== int(user_otp):
            print("Email Verified")

        


@app.route('/users')
def users():
      users=mongo.db.Login_Details.find()
      return dumps(users)

if __name__=="__main__":
    app.run(host='0.0.0.0', debug=True)
