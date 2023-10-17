import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import '../../css/verifyOtp.css'

const VerifyLogin = (props) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')              
    const [errors, setErrors] = useState({})              

    const handleChange = (e) => {
        setOtp(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            otp
        }
        const validationErrors= {}
        if(!formData.otp.trim()) {
            validationErrors.otp = "Otp is required"
        } else if(formData.otp.length < 6 && formData.otp.length > 6){
            validationErrors.otp = "Otp should be 6 digits"
        } else if(formData.otp !== Number(formData.otp)){
            validationErrors.otp = "Otp should be a Number"
        } 

        setErrors(validationErrors)

        if(otp){
            const loader = async () => {
                try {
                    const response = await axios.post('https://falt.onrender.com/api/user/verify-login', formData, {
                        headers: {
                            'authorization' : localStorage.getItem('token')
                        }})
                    console.log(response.data)
                    if(response.data.hasOwnProperty("user")) {
                        localStorage.setItem('isVerified', "true")
                        setOtp('')
                        navigate("/")
                    }    
                } catch(e){
                    alert(e.message)
                }
            }
            loader()
        } else {
            alert('enter a valid otp')
        }
    }

    return (
        <section className="otp-page">
        <div className="otp-box">
            <form action="">
                <h2> Verify OTP</h2>
                <div className="input-box">
                    <input type="text"  value={otp} onChange={handleChange} required />
                    <label>OTP :</label>
                    {errors.otp && <span><p> ! {errors.otp}  </p><br/></span>}
                </div>
                <button onClick={handleSubmit} className="btn btn-outline-primary" >Login</button>
            </form>
        </div>
    </section>
    )
}

export default VerifyLogin