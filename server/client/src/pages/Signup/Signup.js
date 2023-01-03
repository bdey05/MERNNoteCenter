import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from "../../services/users"
import { useNavigate } from "react-router-dom";
import "./signup.css"

const Signup = () => {
    
    useEffect(() => {
        localStorage.clear()
    }, [])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }



    const handleSignup = (e) => {
        e.preventDefault()
        if (password === confirmpassword) {
            createUser(username, password)
            setUsername("")
            setPassword("")
            setConfirmPassword("")
            navigate("/login", {state: {accountcreated: true}})
        }
    }

    return (
        <div className="signup">
            <div className="formbox">
                <div className="signuptext">
                    <h2>Welcome!</h2>
                    <p>Make an account to start creating notes</p>
                </div>
                <form className="signupform" onSubmit={handleSignup}>
                    <input required type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input required type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <input required type="password" placeholder="Confirm Password" value={confirmpassword} onChange={handleConfirmPasswordChange} />
                    <button type="submit">Signup</button>
                </form>
                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup