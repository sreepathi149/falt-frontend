import {Container, Row, Col, Form} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import validator from "validator"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../css/register.css'

const Register = () => {
const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [focused, setFocused] = useState(false)
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [companyAddress, setCompanyAddress] = useState({
    place: '',
    city: '',
    state:'',
    pincode: '',
    landmark:''
  })

  useEffect(() => {
    setIsValid(validator.isMobilePhone(mobile))
  }, [mobile])

  const handleFocus = (e) => {
    setFocused(true);
  }

  const handleMobileChange = (value) => {
    setMobile(value)
  }

  const handleChange = (e) => {
    if(e.target.name === "username") {
      setUsername(e.target.value)
    } else if(e.target.name === "email") {
      setEmail(e.target.value)
    } else if(e.target.name === "mobile") {
      setMobile(e.target.value)
    } else if(e.target.name === "password") {
      setPassword(e.target.value)
    } else if(e.target.name === 'companyname'){
      setCompanyName(e.target.value)
    } else if(e.target.name === 'companywebsite') {
        setCompanyWebsite(e.target.value)
    } else if(e.target.name === 'place') {
        setCompanyAddress({...companyAddress, place: e.target.value})
    } else if(e.target.name === 'city') {
        setCompanyAddress({...companyAddress, city: e.target.value})
    } else if(e.target.name === 'state') {
        setCompanyAddress({...companyAddress, state: e.target.value})
    } else if(e.target.name === 'pincode') {
        setCompanyAddress({...companyAddress, pincode: e.target.value})
    } else if(e.target.name === 'landmark') {
        setCompanyAddress({...companyAddress, landmark: e.target.value})
    }
  }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
          username,
          email,
          mobile,
          password, companyName, companyWebsite, companyAddress
        }

        const resetForm = () => {
            setUsername('')
            setEmail('')
            setPassword('')
            setMobile('')
            setCompanyName('')
            setCompanyAddress({
                place: '',
                city: '',
                state:'',
                pincode: '',
                landmark:''
            })
            setCompanyWebsite('')   
        }

        const validationErrors={}

        if(!formData.username.trim()) {
            validationErrors.username = "username is required"
        }

        if(!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email = "email is not valid"
        }

        if(!formData.mobile.trim()){
            validationErrors.mobile = "mobile number is required"
        }else if(formData.mobile.length < 10){
            validationErrors.mobile = "mobile number should be at least 10 digits"
        }

        if(!formData.companyName.trim()) {
            validationErrors.companyName = "company name is required"
        }

        if(!formData.companyWebsite.trim()) {
            validationErrors.companyWebsite = "company website is required"
        }

        if(!formData.companyAddress.place.trim()) {
            validationErrors.place = "place is required"
        }
        if(!formData.companyAddress.city) {
            validationErrors.city = "city is required"
        }
        if(!formData.companyAddress.state) {
            validationErrors.state = "state is required"
        }
        if(!formData.companyAddress.landmark) {
            validationErrors.landmark = "landmark is required"
        }
        if(!formData.companyAddress.pincode) {
            validationErrors.pincode = "pincode is required"
        }

        if(!formData.password) {
            validationErrors.password = "password is required"
        } else if(formData.password.length < 8){
            validationErrors.password = "password should be at least 8 char"
        }

        setErrors(validationErrors)

        if(Object.keys(errors).length === 0) {
            const loader = async () => {
                try{
                    const response = await axios.post('https://falt.onrender.com/api/user/register', formData)
                    console.log(response.data)
                    if(response.data.hasOwnProperty("user")) {
                        alert('successfully registered with us')
                        navigate("/login")  
                        resetForm()
                    } 
                } catch(e) {
                    alert(e.message)
                }
            }
            loader() 
        }       
    }

    return (
        <section>
            <Container fluid>
                <div className="register-box">
                    <div className='formInput'>
                        <form onSubmit={handleSubmit} className='form-class'>
                            <h2 className='h2-class'> Register </h2>
                            <Row>
                                <Col>
                                    <label className='label-class'> Username <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Username' 
                                            name="username" 
                                            value={username} 
                                            onChange={handleChange}
                                            onBlur={handleFocus}
                                            focused={focused.toString()}
                                        /> 
                                    </label><br/>
                                    {username.length ==0 ? <span className='span-class'> {errors.username} </span> : null}
                                </Col>
                                <Col>
                                    <label className='label-class'> Email <br/>
                                        <input 
                                            className='input-class'
                                            type="email" 
                                            placeholder='Email' 
                                            name="email" 
                                            value={email} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.email && <span className='span-class'> {errors.email} </span>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className='label-class'> Mobile </label><br/>
                                        <PhoneInput country={"in"} placeholder="phone number" maxlength={10} 
                                            value={mobile} onChange={handleMobileChange} inputProps={{required: true, autoFocus: true}} 
                                            inputStyle={{width: "230px", height:"50px"}}
                                            containerStyle={{marginTop: "4px"}}
                                        /> 
                                        {isValid ? <span className='span-class'>Phone number is valid </span> : <span className='span-class'> Phone number is invalid </span>}
                                </Col>
                                <Col>
                                    <label className='label-class'> Password <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Password' 
                                            name="password" 
                                            value={password} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.password && <span className='span-class'> {errors.password} </span>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className='label-class'> Company Name <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Company Name' 
                                            name="companyname" 
                                            value={companyName} 
                                            onChange={handleChange} 
                                        />
                                    </label><br/>
                                    {errors.companyName && <span className='span-class'> {errors.companyName} </span>}
                                </Col>
                                <Col>
                                    <label className='label-class'> Company Website <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Company Website' 
                                            name="companywebsite" 
                                            value={companyWebsite} 
                                            onChange={handleChange} 
                                        />
                                    </label><br/>
                                    {errors.companyWebsite && <span className='span-class'> {errors.companyWebsite} </span>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label className='label-class'> Place <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Place' 
                                            name="place" 
                                            value={companyAddress.place} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.place && <span className='span-class'> {errors.place} </span>}
                                </Col>
                                <Col>
                                    <label className='label-class'> Landmark <br/>
                                        <input 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Landmark' 
                                            name="landmark" 
                                            value={companyAddress.landmark} 
                                            onChange={handleChange} 
                                        />
                                    </label><br/>
                                    {errors.landmark && <span className='span-class'> {errors.landmark} </span>}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="auto">
                                    <label className='label-class'> City <br/>
                                        <input  style={{width: "150px", height:"50px"}} 
                                            className='input-class'
                                            type="text" 
                                            placeholder='City' 
                                            name="city" 
                                            value={companyAddress.city} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.city && <span className='span-class'> {errors.city }</span>}
                                </Col>
                                <Col xs="auto">
                                    <label className='label-class'> State <br/>
                                        <input style={{width: "150px", height:"50px"}} 
                                            className='input-class'
                                            type="text" 
                                            placeholder='State' 
                                            name="state" 
                                            value={companyAddress.state} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.state && <span className='span-class'> {errors.state }</span>}
                                </Col>
                                <Col xs="auto">
                                    <label className='label-class'> Pincode <br/>
                                        <input style={{width: "150px", height:"50px"}} 
                                            className='input-class'
                                            type="text" 
                                            placeholder='Pincode' 
                                            name="pincode" 
                                            value={companyAddress.pincode} 
                                            onChange={handleChange} 
                                        /> 
                                    </label><br/>
                                    {errors.pincode &&  <span className='span-class'> {errors.pincode} </span>}
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center mt-3 mb-1">
                                <button type="submit" className="btn btn-outline-primary btn-sm" style={{width: "150px", height: "40px"}}>Submit</button><br/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <p>Already have an account? <a href="/login">SignIn</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Register