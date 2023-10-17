import {useState} from "react";
import axios from "axios";
import '../../css/login.css'
import { Alert } from "../helpers/swal";

const Login=(props)=>{
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errors,setErrors]=useState({})

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:email,
            password:password
        }
        //validations
        const validationErrors = {}
        if(!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email = "email is not valid"
        }
        if(!formData.password.trim()) {
            validationErrors.password = "password is required"
        } else if(formData.password.length < 6){
            validationErrors.password = "password should be at least 6 char"
        }
        setErrors(validationErrors)

        if(Object.keys(errors).length === 0) {
            const loader = async () => {
                const response = await axios.post('https://falt.onrender.com/api/user/login', formData)
                console.log(response.data)
                if(response.data.hasOwnProperty("token")) {
                    Alert('Otp Sent Successfully','success', 'verify-login')
                    let token = response.data.token
                    localStorage.setItem('token', token)
                    setEmail('')
                    setPassword('')                
                } else {
                    Alert(response.data.error ? response.data.error : response.data,'info', response.data.error ? 'login' : 'pricing')
                }
            }
            loader()
        }
        
    }
    const handleChange=(e)=>{
         if(e.target.name ==='email')
        {
            setEmail(e.target.value)
        }
        else if(e.target.name ==='password')
        {
            setPassword(e.target.value)
        }
    }
    return(
        <section className="login-page">
            <div className="login-box">
                <form action="">
                    <h2>Login</h2>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail-outline"></ion-icon>
                        </span>
                        <input type="email" name="email" value={email} onChange={handleChange} required />
                        <label>Email:</label>
                        {errors.email && <span><p> ! {errors.email}  </p><br/></span>}
                    </div>
                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                        </span>
                        <input type="password" name="password" value={password} onChange={handleChange} required />
                        <label>Password:</label>
                        {errors.password && <span><p> ! {errors.password}  </p><br/></span>}
                    </div>
                        {Object.keys(errors).length > 0 && <br/>}
                    <div className="remember-forgot">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                    
                    <button onClick={handleSubmit} className="btn btn-outline-primary" >Get Otp</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="/free-trail">Register</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}
export default Login