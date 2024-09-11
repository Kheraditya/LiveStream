RTSP Video Streaming with Custom Overlays
Project Overview
This project is a web application that allows users to view RTSP live-streamed video with custom overlays that can be positioned, resized, and managed using a CRUD API. The application consists of a React frontend for the user interface, a Flask backend to handle API requests, and MongoDB for storing overlay information. Users can play a livestream, and place overlays (e.g., text, logos) on top of the video in real-time.

Key Features:
RTSP Video Playback: Streams video from an RTSP URL.
Custom Overlays: Add, edit, delete, and position overlays (e.g., text, images) on top of the video.
CRUD API: Create, Read, Update, Delete overlay configurations using a Flask API.
Responsive UI: Manage overlays directly through a simple user interface.
Tech Stack
Frontend:
React,
Axios (for API requests),
HTML5 <video> tag,

Backend:
Python (Flask),
MongoDB (Cloud instance),

Dependencies:
Flask,
Flask-CORS,
pymongo,
Axios (React library for HTTP requests),


File Structure

Copy code
├── backend/
│   ├── app.py               # Flask backend application
│   ├── requirements.txt      # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OverlayControl.js   # Component for managing overlays
│   │   │   ├── OverlayDisplay.js   # Component for displaying video and overlays
│   │   ├── App.js                 # Main entry point for React app
│   ├── package.json          # Frontend dependencies
├── README.md                 # Project documentation


Installation and Setup
Prerequisites:

Node.js (for running the frontend),
Python 3.x (for running the backend),
MongoDB Atlas (for database),
FFmpeg (optional, for transcoding RTSP to HLS),

1. Setting Up the Backend
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/rtsp-overlay-streaming.git
cd rtsp-overlay-streaming/backend
Install Python dependencies:
bash
Copy code
pip install -r requirements.txt
Configure MongoDB:
Create a MongoDB Atlas account and a cluster.
Get the MongoDB connection string and add it to the app.py:
python
Copy code
client = pymongo.MongoClient("<your_mongodb_connection_string>")
Run the Flask Backend:
bash
Copy code
python app.py
This will start the Flask server at http://localhost:5000.

2. Setting Up the Frontend
Navigate to the frontend folder:
bash
Copy code
cd ../frontend
Install Node.js dependencies:
bash
Copy code
npm install
Update RTSP Stream URL:
In the OverlayDisplay.js file, update the streamUrl with your RTSP stream:

javascript
Copy code
const streamUrl = "rtsp://your_rtsp_stream_url";
Run the Frontend:
bash
Copy code
npm start
This will start the React development server at http://localhost:3000.

Running the Application
Start the Flask backend: This will handle API requests and serve the overlay data.
Start the React frontend: This will display the RTSP video stream along with custom overlays that you can manage through the UI.
Add, Update, and Delete Overlays: Use the UI to manage overlays on the video.
API Endpoints
GET /overlay: Fetch all saved overlays.
POST /overlay: Create a new overlay.
PUT /overlay/
: Update an existing overlay.
DELETE /overlay/
: Delete an overlay.
Example RTSP to HLS Conversion (Optional)
To convert your RTSP stream to HLS using FFmpeg:

bash
Copy code
ffmpeg -i rtsp://your_rtsp_stream_url -c:v copy -hls_time 2 -hls_list_size 4 -f hls /path/to/output/playlist.m3u8
Known Issues
RTSP Playback in Browser: Browsers don't natively support RTSP streams. Consider transcoding the RTSP stream to HLS using FFmpeg or a media server.
Overlay Positioning: Ensure the overlays are positioned relative to the video container to appear on top of the video correctly.
