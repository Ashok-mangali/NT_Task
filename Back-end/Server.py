from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://aashok59238:Ashok%402003@cluster0.rilh5me.mongodb.net/")
db = client['Profile']
Information = db['Information']


@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(db.Information.find({}, {'_id':0},)) 
    return jsonify(data)
    
        # Insert data into MongoDB
           
        # content = request.json
        # db.Information.insert_one(content)
        # return jsonify({'status': 'Data will be added'})

@app.route('/api/po', methods=['POST'])
def add_data():
    content = request.json
    db.Information.insert_one(content)
    return jsonify({'status': 'Data will be added'})


@app.route('/api/up', methods=['PUT'])
def update_data():
    content = request.json
    # Specify to update operation
    filter = {'name': 'Sam'}

    update = {'$set': content}
    # Perform to update an operation
    db.Information.update_one(filter,update, upsert=True)
    return jsonify({'status': 'Data will be Updated'})


@app.route('/api/del', methods=['DELETE'])
def delete_data():
    
    content = request.json
    db.Information.delete_one(content)
    return jsonify({'status': 'Data will be deleted'})
    
    
    
if __name__ == '__main__':
    app.run(debug=True)