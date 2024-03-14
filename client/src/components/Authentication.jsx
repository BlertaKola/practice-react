import { useState } from "react"
import axios from 'axios'
import './Authentication.css'
const Authentication = (props) => {
    const {loguser, setLogUser} = props
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const [loginUser ,setLoginUser] = useState({
        email: "",
        password: ""
    })

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("CLICKED REGISTER")
        axios.post('http://localhost:8000/api/register', user, {withCredentials: true})
            .then(res => {
                console.log(res)
                setLogUser({id:res.data.user._id,email:res.data.user.email});
                localStorage.setItem('userId', res.data.user._id);
                window.location.href = '/';
            })
            .catch(err => console.log(err))
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("CLICKED LOGIN")
        axios.post('http://localhost:8000/api/login', loginUser, {withCredentials: true})
            .then(res => {
                console.log(res)
                setLogUser({id:res.data.user._id,email:res.data.user.email});
                localStorage.setItem('userId', res.data.user._id);
                window.location.href = '/';
            })
            .catch(err => console.log(err))
    }

    return(
        <>
        <div className="auth-container">
            <div  className="auth-form">
                <h1>Register Here</h1>
                <form onSubmit={handleRegister}>
                    <input type="text" value={user.firstName} onChange={(e)=>setUser({...user, firstName: e.target.value})} placeholder="First name"/>
                    <input type="text" value={user.lastName} onChange={(e)=>setUser({...user, lastName: e.target.value})} placeholder="Last name"/>
                    <input type="email" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} placeholder="Email"/>
                    <input type="password" value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})} placeholder="Password"/>
                    <input type="password" value={user.confirmPassword} onChange={(e)=>setUser({...user, confirmPassword: e.target.value})} placeholder="Confirm your password"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div  className="auth-form">
                <h1>Login Here</h1>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Your email" value={loginUser.email} onChange={(e) => setLoginUser({...loginUser, email: e.target.value})}/>
                    <input type="password" placeholder="Your password" value={loginUser.password}  onChange={(e) => setLoginUser({...loginUser, password: e.target.value})} />
                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
        </>
    )
}
export default Authentication