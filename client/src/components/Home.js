import React from 'react'
import './Home.css'

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
                <button className='gs-btn'>Get Started</button>
                <button className='vg-btn'>View on Github</button>
            </div>
        </div>
    )
}

export default Home
