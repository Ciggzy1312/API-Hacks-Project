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
  const [currentPlaceId, setCurrentPlaceId] = useState('');
  const [currentUsername, setCurrentUsername] = useState('John')
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
      lat: parseFloat(location.lat),
      long: parseFloat(location.long),
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

  const handleQuery = async (lat,long)=>{
      try {
        const res = await axios.get(`/pins?lat=${lat}&long=${long}`);
        //setPins(res.data)
        //window.open(newPageUrl, "_blank")
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <div className='App'>
      <div className="section">
        <ReactMapGL
        className='mapbox'
        {...viewport}
        mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        //onDblClick={handleAddPlace}
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
                <Room
                  className = 'room'
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: currentUsername === p.username ? "red" : "blue",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => handleMarkerClick(p._id, p.lat, p.long)}
                  onMouseLeave={() => setShowPopup(false)}
                  //onDoubleClick = {() => handleQuery(p.lat,p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && showPopup && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(parseInt(p.rating)).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{p.createdAt}</span>
                  </div>
                </Popup>
              )}
              </>
            ))}
        </ReactMapGL>

        <div className='sidebar'>
          <form className='sb-form' onSubmit={handleSubmit}>
          <label>Title</label>
              <input
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Experience</label>
              <textarea
                value = {desc}
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
            <button type="submit" className="submitButton">Add Pin</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;