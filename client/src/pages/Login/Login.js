import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/login'
import { setToken } from '../../services/notes'
import "./login.css"

const Login = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    let creationMessage = "";

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const loggedinuser = login(username, password)
        loggedinuser.then(item => {
            setToken(item.token)
            localStorage.setItem("userToken", JSON.stringify(item.token))
        })
        navigate("/notecenter", {state: {username}})
    }

   
    if (location.state && location.state.accountcreated) {
        creationMessage = "Account Created Succesfully";      
    }
 
    return (
        <div className="login">
            <div className="formbox">
                {creationMessage !== "" && <div className="creation">{creationMessage}</div>}
                <div className="logintext">
                    <h2>Welcome Back!</h2>
                    <p>Login to view and create notes</p>
                </div>
                <form className="loginform" onSubmit={handleSubmit}>
                    <input required type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input required type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup" className="link">Signup</Link></p>
            </div>
        </div>
    )
}

export default Login