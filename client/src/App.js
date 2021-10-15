import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import './App.css';

function App() {

  const [viewport, setViewport] = useState({
    width: "70vw",
    height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 4
  });

  const [location, setLocation] = useState({
    lat : null,
    long : null
  })

  const [status, setStatus] = useState('')
  
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLocation({
          lat : position.coords.latitude,
          long : position.coords.longitude
        })
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <div className="App">
      <ReactMapGL
      className='mapbox'
      {...viewport}
      mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      //onDblClick={handleAddPlace}
      transitionDuration = '100'
      >
        <Marker
          latitude = {48}
          longitude = {15}
          offsetLeft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
        ><h1>Hello</h1></Marker>
      </ReactMapGL>

      <div className='sidebar'>
        <form className='sb-form'>
          
        </form>
        <button onClick={getLocation}>Get Location</button>
        {location.lat && <p>Latitude: {location.lat}</p>}
        {location.long && <p>Longitude: {location.long}</p>}
      </div>
    </div>
  );
}

export default App;
