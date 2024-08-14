from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import bcrypt
import json
import os

app = Flask(__name__)
CORS(app)

SECRET_KEY = 'your_secret_key'
USER_FILE = 'users.json'
DATA_FILE = 'user_data.json'

def read_file(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return {}

def write_file(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)

def read_users():
    return read_file(USER_FILE)

def write_users(users):
    write_file(USER_FILE, users)

def read_user_data():
    return read_file(DATA_FILE)

def write_user_data(data):
    write_file(DATA_FILE, data)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users = read_users()

    if username in users:
        return jsonify({'message': '用戶已存在'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    users[username] = {
        'password': hashed_password.decode('utf-8')
    }

    write_users(users)

    # 初始化用戶數據
    user_data = read_user_data()
    user_data[username] = {
        'notes': [],
        'tasks': []
    }
    write_user_data(user_data)

    return jsonify({'message': '用戶註冊成功'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    users = read_users()

    if username not in users:
        return jsonify({'message': '用戶不存在'}), 400

    if not bcrypt.checkpw(password.encode('utf-8'), users[username]['password'].encode('utf-8')):
        return jsonify({'message': '密碼錯誤'}), 400

    token = jwt.encode({'username': username}, SECRET_KEY, algorithm='HS256')

    return jsonify({'token': token})

@app.route('/user_data', methods=['GET'])
def get_user_data():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': '未提供認證令牌'}), 401

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = payload['username']
    except jwt.ExpiredSignatureError:
        return jsonify({'message': '令牌已過期'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': '無效的令牌'}), 401

    user_data = read_user_data()
    if username not in user_data:
        return jsonify({'message': '用戶數據不存在'}), 404

    return jsonify(user_data[username])

@app.route('/user_data', methods=['POST'])
def update_user_data():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': '未提供認證令牌'}), 401

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = payload['username']
    except jwt.ExpiredSignatureError:
        return jsonify({'message': '令牌已過期'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': '無效的令牌'}), 401

    new_data = request.json
    user_data = read_user_data()
    user_data[username] = new_data
    write_user_data(user_data)

    return jsonify({'message': '用戶數據更新成功'})

# 在 server.py 中添加以下路由

@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': '未提供認證令牌'}), 401

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = payload['username']
    except jwt.ExpiredSignatureError:
        return jsonify({'message': '令牌已過期'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': '無效的令牌'}), 401

    users = read_users()
    user_data = read_user_data()

    if username not in users:
        return jsonify({'message': '用戶不存在'}), 404

    # 刪除用戶
    del users[username]
    write_users(users)

    # 刪除用戶數據
    if username in user_data:
        del user_data[username]
        write_user_data(user_data)

    return jsonify({'message': '用戶成功刪除'}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)