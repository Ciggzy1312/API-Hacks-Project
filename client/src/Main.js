import React, {useState} from 'react'
import App from './components/App'
import QueryPage from './components/QueryPage'
import Home from './components/Home'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

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
        <Router>           
            <div>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>

                    <Route exact path='/maps'>
                        <App handleQuery = {(lat,long)=>handleQuery(lat,long)}/>
                    </Route>

                    <Route exact path='/query'>
                        <QueryPage query={query}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Main
