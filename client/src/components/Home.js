import React,{ useState, useRef } from 'react'
import './Home.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Home = () => {

    const myStorage = window.localStorage

    const [isRegister, setIsRegister] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)

    const [currentUsername, setCurrentUsername] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleIsRegister = ()=>{
        setRegister(true)
        setLogin(false)
    }

    const handleIsLogin = ()=>{
        setRegister(false)
        setLogin(true)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        };
    
        try {
          await axios.post("/users/register", newUser);
          setRegister(false)
          setLogin(true)
          setUsername('')
          setPassword('')
        } catch (err) {
            setError(true)
        }
      };

      const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }

        try {
          const res = await axios.post("/users/login", user);
          setCurrentUsername(res.data.username)
          myStorage.setItem('user', res.data.username)
          setLogin(false)
          setIsRegister(true)
          setIsLogin(true)
        } catch (err) {
          setError(true);
        }
      };

    return (
        <div className='home'>
            <div className='home-section'>
                <div className='home-heading'>
                    <h1>Tales of <span>Hacking</span></h1>
                </div>

                <div className='home-sub'>
                    <h3>Drop in your tales of hacking, achievments and podcasts to help out the next gen of hackers to take their first step</h3>
                </div>

                <div className='home-btn'>
                    {isRegister ? <Link to='/maps'><button className='gs-btn'>Get Started</button></Link> :  <button className='register-btn' onClick={handleIsRegister}>Register</button>}
                    {isLogin ? <Link to=''><button className='vg-btn'>View on Github</button></Link> : <button className='login-btn' onClick={handleIsLogin}>Login</button>}                    
                    
                </div>
            </div>

            <div className='form-content'>
                {register && 
                <form className='h-form' onSubmit={handleRegister}>
                    <label className='sb-label'>Username</label>
                        <input
                            className='sb-input'
                            value = {username}
                            ref={usernameRef}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    <label className='sb-label'>Email</label>
                        <input
                            type='email'
                            className='sb-input'
                            value = {email}
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    <label className='sb-label'>Password</label>
                        <input
                            type='password'
                            className='sb-input'
                            value = {password}
                            ref={passwordRef}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <button type="submit" className="submitButton">Register</button>
                </form>}

                {login && 
                    <form className='h-form' onSubmit={handleLogin}>
                    <label className='sb-label'>Username</label>
                        <input
                            className='sb-input'
                            value = {username}
                            ref={usernameRef}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    <label className='sb-label'>Password</label>
                        <input
                            type='password'
                            className='sb-input'
                            value = {password}
                            ref={passwordRef}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <button type="submit" className="submitButton">Login</button>
                    {error && <span className="failure">Something went wrong! Please try again</span>}
                </form>
            }
            </div>
        </div>
    )
}

export default Home
