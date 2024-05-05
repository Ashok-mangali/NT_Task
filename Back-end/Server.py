from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://aashok59238:Ashok%402003@cluster0.rilh5me.mongodb.net/")
db = client['Profile']
Information = db['Information']

#GET
@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(db.Information.find({}))
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@app.route('/api/po', methods=['POST'])
def add_data():
    content = request.json
    db.Information.insert_one(content)
    return jsonify({'status': 'Data will be added'})

@app.route('/api/up/<id>', methods=['PUT'])
def update_data(id):
    content = request.json
    db.Information.update_one({'_id': id}, {'$set': content})
    return jsonify({'status': 'Data updated successfully'})

@app.route('/api/del/<id>', methods=['DELETE'])
def delete_data(id):
    db.Information.delete_one({'_id': ObjectId(id)})
    return jsonify({'status': 'Data deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)
