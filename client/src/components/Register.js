import React from 'react'
import axios from "axios"
import {useRef} from "react"
import {useNavigate } from "react-router-dom"

export default function Register() {

    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()

    const handleClick = async(e) => {
        e.preventDefault()
        if(password.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("Password doest not match")
        } else {
            const newUser = {
                userName: userName.current.value,
                password: password.current.value,
                email: email.current.value
            }
            try{
                await axios.post("/auth/register",newUser)
                navigate("/")
            } catch(err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="register">
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
                    <input 
                        placeholder='Confirm Password'
                        type="password" 
                        className="loginInput" 
                        required
                        minLength="6"
                        maxLength="20"
                        ref={confirmPassword}
                    />
                    <button className="registerButton" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
