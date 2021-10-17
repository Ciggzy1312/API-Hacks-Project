import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import './App.css';

function App(props) {

  const [viewport, setViewport] = useState({
    width: "70vw",
    height: "100vh",
    latitude: 46,
    longitude: 12,
    zoom: 3
  });

  const [location, setLocation] = useState({
    lat : null,
    long : null
  })

  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState('');
  const [currentUsername, setCurrentUsername] = useState(localStorage.getItem('user'))
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(1);
  const [status, setStatus] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  
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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    //setViewport({ ...viewport, latitude: lat, longitude: long })
    setShowPopup(true)
  };

  useEffect(() => {
    getLocation()
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data)
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
      lat: parseFloat(location.lat).toFixed(3),
      long: parseFloat(location.long).toFixed(3),
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

  {/*const handleQuery = async (lat,long)=>{
      try {
        const res = await axios.get(`/pins?lat=${lat}&long=${long}`);
        //setPins(res.data)
        //window.open(newPageUrl, "_blank")
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
  }*/}

  return (
    <div className='App'>
      <div className="section">
        <ReactMapGL
        className='mapbox'
        {...viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        transitionDuration = '300'
        >
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Link to='/query'>
                <Room
                  className = 'room'
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: currentUsername === p.username ? "red" : "blue",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleMarkerClick(p._id, p.lat, p.long)}
                  onMouseLeave={() => setShowPopup(false)}
                  onClick = {() => props.handleQuery(p.lat,p.long)}
                /></Link>
              </Marker>
              {p._id === currentPlaceId && showPopup && (
                <Popup
                  className='popup'
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="m-card">
                    <label className='m-label'>Event</label>
                    <h4 className="m-place">{p.title}</h4>
                    <label className='m-label'>Experience</label>
                        <p className="m-desc">{p.desc}</p>
                        <label className='m-label'>Rating</label>
                        <div className="m-stars">
                        {Array(parseInt(p.rating)).fill(<Star className="star" />)}
                        </div>
                        <h4 className="m-username">
                        Created by {p.username}
                        </h4>
                        <h5 className="m-date">{format(p.createdAt)}</h5>
                  </div>
                </Popup>
              )}
              </>
            ))}
        </ReactMapGL>

        <div className='sidebar'>
          <form className='sb-form' onSubmit={handleSubmit}>
          <label className='sb-label'>Event</label>
              <input
                className='sb-input'
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className='sb-label'>Experience</label>
              <textarea
                className='sb-textarea'
                value = {desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <label className='sb-label'>Rating</label>
              <select className='sb-select' onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            <button type="submit" className="submitButton">Add Pin</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
