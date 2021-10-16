import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-heading'>
                <h1>Tales of <span>Hacking</span></h1>
            </div>

            <div className='home-sub'>
                <h3>Drop in your tales of hacking, achievments and podcasts to help out the next gen of hackers to take their first step</h3>
            </div>

            <div className='home-btn'>
                <Link to='/maps'><button className='gs-btn'>Get Started</button></Link>
                <Link to=''><button className='vg-btn'>View on Github</button></Link>
            </div>
        </div>
    )
}

export default Home
