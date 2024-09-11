import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OverlayControl from './OverlayControl';

const OverlayDisplay = ({ streamUrl }) => {
  const [overlays, setOverlays] = useState([]);  // Overlay data from the backend
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const [selectedOverlay, setSelectedOverlay] = useState(null);  // Overlay selected for editing
  const [newContent, setNewContent] = useState('');  // Updated content for the overlay
  const [newPositionTop, setNewPositionTop] = useState({ top: 0, left: 0 });
  const [newPositionLeft, setNewPositionLeft] = useState({ top: 0, left: 0 });
  const [newSize, setNewSize] = useState({ top: 0, left: 0 });

  // Fetch overlays from the backend
  const fetchOverlays = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/overlay');
      setOverlays(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle selecting an overlay for editing
  const handleEditOverlay = (overlay) => {
    setSelectedOverlay(overlay);
    setNewContent(overlay.content);  // Set initial content for editing
    setNewPositionTop(overlay.positionTop);
    setNewPositionLeft(overlay.positionLeft);
    setNewSize(overlay.size)
  };

  // Handle saving the updated overlay
  const handleSaveOverlay = async () => {
    if (!selectedOverlay) return;
    
    try {
      await axios.put(`http://localhost:5000/overlay/${selectedOverlay._id}`, {
        content: newContent,
        positionTop: newPositionTop,  // Use the existing position
        positionLeft: newPositionLeft,  // Use the existing position
        size: newSize           // Use the existing size
      });
      setSelectedOverlay(null);  // Clear the selection after updating
      fetchOverlays();  // Refresh the overlays
    } catch (err) {
      console.error('Error updating overlay:', err.message);
    }
  };

  // Handle deleting an overlay
  const handleDeleteOverlay = async (overlayId) => {
    try {
      await axios.delete(`http://localhost:5000/overlay/${overlayId}`);
      fetchOverlays();  // Refresh the overlays after deletion
    } catch (err) {
      console.error('Error deleting overlay:', err.message);
    }
  };

  // Fetch overlays on component mount
  useEffect(() => {
    fetchOverlays();
  }, []);

  if (loading) {
    return <div>Loading overlays...</div>;
  }

  if (error) {
    return <div>Error fetching overlays: {error}</div>;
  }

  return (
    <div >

   <OverlayControl fetchOverlays={fetchOverlays}/>
    <div style={{ position: 'relative', width: '800px', height: '450px', marginLeft:"300px", marginTop:"30px" }}>
      <video width="800" controls>
        <source src={streamUrl} type="application/x-rtsp" />
        Your browser does not support the video tag.
      </video>
      <div >

      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          style={{
            position: 'absolute',
            top: overlay.positionTop,
            left: overlay.positionLeft,
            fontSize: overlay.size,
            border: selectedOverlay && selectedOverlay._id === overlay._id ? '1px solid red' : 'none'
          }}
        >
          {overlay.content}
        </div>
      ))}
      </div>
      <div style={{marginTop:"20px"}}>

      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          style={{
           margin:"20px",
            fontSize: "30px",
            border: selectedOverlay && selectedOverlay._id === overlay._id ? '1px solid red' : 'none'
          }}
        >
          {overlay.content}
          <button style={{marginLeft:"10px",marginRight:"10px"}} onClick={() => handleEditOverlay(overlay)}>Edit</button>
          <button onClick={() => handleDeleteOverlay(overlay._id)}>Delete</button>
        </div>
      ))}
      </div>

      {/* Edit Overlay Section */}
      <div style={{marginTop:"70px"}}>
      {selectedOverlay && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit Overlay</h3>
          <label>Content:</label>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <label>Size:</label>
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
          <label>Top Position:</label>
          <input
            type="text"
            value={newPositionTop}
            onChange={(e) => setNewPositionTop( e.target.value )}
          />
          <label>Left Position:</label>
          <input
            type="text"
            value={newPositionLeft}
            onChange={(e) => setNewPositionLeft( e.target.value )}
          />
          <button onClick={handleSaveOverlay}>Save</button>
          <button onClick={() => setSelectedOverlay(null)}>Cancel</button>
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default OverlayDisplay;





