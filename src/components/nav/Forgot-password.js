import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import '../../css/reset-password.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'newPassword') {
            setNewPassword(e.target.value)
        } else if(e.target.name === 'confirmNewPassword') {
            setConfirmNewPassword(e.target.value)
        } else if(e.target.name === 'otp') {
            setOtp(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email
        }
        const loader = async () => {
            try{
                const response = await axios.put('https://falt.onrender.com/api/user/forgot-password', data)
                //console.log(response.data) 
                if(response) {
                    alert('Otp sent successfully')
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }

    const handlePassword = (e) => {
        e.preventDefault()
        const data = {
            email, otp, newPassword
        }
        if(newPassword === confirmNewPassword) {
            const loader = async () => {
                try{
                    const response = await axios.put('https://falt.onrender.com/api/user/verify-otp-password', data)
                    //console.log(response.data)
                    if(response) {
                        alert('successfully updated Password')
                        navigate('/login')  
                    } 
                } catch(e) {
                    alert(e.message)
                }
            }
            loader()
        } else {
            console.log("passwords not matched")
        }
    }

    const handleBack = () => {
        navigate('/login')
    }

    return (
        <div className="reset-box">
            <div>
                <h4 className="text-center text-success">Reset Password</h4>
        <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingEmail" label="email" className="mt-1" >
                <Form.Control type="text" 
                    placeholder="enter your email"
                    name="email"
                    defaultValue={email} 
                    onChange={handleChange}
                    required />
            </FloatingLabel>
            <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-info" type="submit" style={{width:"120px"}}>Get-Otp</Button>
            </div>
        </Form>
        <Form onSubmit={handlePassword}>
            <FloatingLabel controlId="floatingOtp" label="Otp" className="mt-1">
                <Form.Control type="text" 
                    placeholder="enter your Otp"
                    name="otp"
                    defaultValue={otp} 
                    onChange={handleChange}
                    required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingNewPassword" label="NewPassword" className="mt-1">
                <Form.Control type="text" 
                    placeholder="enter your new Password"
                    name="newPassword"
                    defaultValue={newPassword} 
                    onChange={handleChange}
                    required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingConfirmNewPassword" label="ConfirmNewPassword" className="mt-1">
                <Form.Control type="text" 
                    placeholder="enter your confirm NewPassword"
                    name="confirmNewPassword"
                    defaultValue={confirmNewPassword} 
                    onChange={handleChange}
                    required />
            </FloatingLabel>
            <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-info" style={{width:"120px", marginRight:"2px"}} onClick={handleBack}>Back</Button>
                <Button variant="outline-info" type="submit" style={{width:"120px", marginLeft:"2px"}}>Submit</Button>
            </div>
        </Form>
        </div>
        </div>
    )
}

export default ForgotPassword