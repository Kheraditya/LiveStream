from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId  # Needed for ObjectId conversion

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection string
# Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials
client = MongoClient("mongodb+srv://adityakher303:Aditya%409811@socialapp.fhjlstw.mongodb.net/LiveStream?retryWrites=true&w=majority&appName=SocialApp")
db = client['overlay_db']
overlays_collection = db['overlays']

# Create overlay
@app.route('/overlay', methods=['POST'])
def create_overlay():
    data = request.json
    overlay_id = overlays_collection.insert_one(data).inserted_id
    return jsonify({'overlay_id': str(overlay_id)}), 201

# Read overlays
@app.route('/overlay', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find())
    for overlay in overlays:
        overlay['_id'] = str(overlay['_id'])  # Convert ObjectId to string for JSON serialization
    return jsonify(overlays), 200

# Update overlay
@app.route('/overlay/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    overlays_collection.update_one({'_id': ObjectId(overlay_id)}, {'$set': data})
    return jsonify({'message': 'Overlay updated'}), 200

# Delete overlay
@app.route('/overlay/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    overlays_collection.delete_one({'_id': ObjectId(overlay_id)})
    return jsonify({'message': 'Overlay deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
