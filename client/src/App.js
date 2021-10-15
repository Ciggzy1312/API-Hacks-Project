import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import './App.css';

function App() {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 4
  });


  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      //onDblClick={handleAddPlace}
      transitionDuration = '100'
      >
      </ReactMapGL>
    </div>
  );
}

export default App;
