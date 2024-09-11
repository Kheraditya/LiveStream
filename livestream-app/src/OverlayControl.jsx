import React, { useState } from 'react';
import axios from 'axios';

const OverlayControl = ({ fetchOverlays }) => {
  const [overlayData, setOverlayData] = useState({ content: '', size: '', positionTop: '', positionLeft:'' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOverlayData({ ...overlayData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/overlay', overlayData);
    fetchOverlays();
  };

  return (
    <form style={{marginLeft:"300px"}} onSubmit={handleSubmit}>
      <input style={{marginRight:"10px"}} type="text" name="content" placeholder="Overlay Content" onChange={handleChange} />
      <input style={{marginRight:"10px"}} type="text" name="size" placeholder="Size" onChange={handleChange} />
      <input style={{marginRight:"10px"}} type="text" name="positionTop" placeholder="Position Top" onChange={handleChange} />
      <input style={{marginRight:"10px"}} type="text" name="positionLeft" placeholder="Position Left" onChange={handleChange} />
      <button type="submit">Add Overlay</button>
    </form>
  );
};

export default OverlayControl;



