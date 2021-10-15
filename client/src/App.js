import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from 'axios'
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

  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('John')
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(1);
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


  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [])


  const handleSubmit = async (e)=>{
    e.preventDefault()
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating,
      lat: parseInt(location.lat),
      long: parseInt(location.long),
    }

    try {
      if(newPin.username && newPin.title && newPin.desc && newPin.lat && newPin.long){
        const res = await axios.post('/pins', newPin)
        setPins([...pins, res.data]);
        setTitle('')
        setDesc('')
        setLocation({
          lat : '',
          long : ''
        })
      }
      else{
        alert('Please enter valid data...')
      }
    } catch (err) {
      console.log(err)
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
        <form className='sb-form' onSubmit={handleSubmit}>
        <label>Title</label>
            <input
              value = {title}
              placeholder="Enter a title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <textarea
              value = {desc}
              placeholder="Say us something about this place."
              onChange={(e) => setDesc(e.target.value)}
            />
            <label>Rating</label>
            <select onChange={(e) => setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label>Latitude</label>
            <input value={location.lat} />

            <label>Longitude</label>
            <input value={location.long} />
          <button type="submit" className="submitButton">Add Pin</button>
        </form>
        <button onClick={getLocation}>Get Location</button>
        {/*{location.lat && <p>Latitude: {location.lat}</p>}
        {location.long && <p>Longitude: {location.long}</p>}*/}
      </div>
    </div>
  );
}

export default App;
