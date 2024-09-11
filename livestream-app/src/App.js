import React from 'react';
import OverlayDisplay from './OverlayDisplay';
// import OverlayControl from './OverlayControl';

const App = () => {
  const streamUrl = 'your-rtsp-stream-url-here';

  return (
    <div>
      <h1 style={{marginLeft:"450px"}}>Livestream with Custom Overlays</h1>
      {/* <OverlayControl /> */}
      <OverlayDisplay streamUrl={streamUrl} />
    </div>
  );
};

export default App;

