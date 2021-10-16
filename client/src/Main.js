import React, {useState} from 'react'
import App from './components/App'
import Login from './components/Login'
import QueryPage from './components/QueryPage'
import axios from 'axios'

const Main = () => {

    const [query, setQuery] = useState([])


    const handleQuery = async (lat,long)=>{
        try {
          const res = await axios.get(`/pins?lat=${lat}&long=${long}`);
          setQuery(res.data)
          //window.open(newPageUrl, "_blank")
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <div>           
            {/*<Login />*/}
            <App handleQuery = {(lat,long)=>handleQuery(lat,long)}/>
            <QueryPage query={query}/>
        </div>
    )
}

export default Main
