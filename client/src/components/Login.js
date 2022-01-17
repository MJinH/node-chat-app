import axios from 'axios';
import { useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../authContext/AuthContext';

export default function Login() {

    const userName = useRef()
    const password = useRef()
    const email = useRef()
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post("/auth/login",
            {userName:userName.current.value,password:password.current.value,email:email.current.value})
            dispatch({type:"LOGIN",userInfo:user.data})
            navigate(`/${user.data.userName}`)
        } catch(err){
            dispatch({type:"ERROR",error:err})
        }
    }

    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <form className="loginForm" onSubmit={handleClick}>
                    <input 
                        placeholder='User Name'
                        type="text" 
                        className="loginInput"
                        required
                        minLength="5"
                        maxLength="20"
                        ref={userName}
                    />
                    <input 
                        placeholder='Email'
                        type="email" 
                        className="loginInput" 
                        required
                        maxLength="30"
                        ref={email}    
                    />
                    <input 
                        placeholder='Password'
                        type="password" 
                        className="loginInput" 
                        required
                        minLength="6"
                        maxLength="20"
                        ref={password}
                    />
                    <button className="loginButton" type="submit">Log In</button>
                </form>
                <button className="registerButton" onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    )
}
