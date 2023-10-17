import {Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import validator from "validator"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FreeTrail = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [isValid, setIsValid] = useState(false)
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
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
      }
      setValidated(true)

        const formData = {
          username,
          email,
          mobile,
          password, companyName, companyWebsite, companyAddress
        }
        // const validationErrors={}

        // if(!formData.username.trim()) {
        //     validationErrors.username = "username is required"
        // }

        // if(!formData.email.trim()) {
        //     validationErrors.email = "email is required"
        // } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        //     validationErrors.email = "email is not valid"
        // }

        // if(!formData.mobile.trim()){
        //     validationErrors.mobile = "mobile number is required"
        // }else if(formData.mobile.length < 10){
        //     validationErrors.mobile = "mobile number should be at least 10 digits"
        // }

        // if(!formData.companyName.trim()) {
        //     validationErrors.companyname = "companyname is required"
        // }

        // if(!formData.companyWebsite.trim()) {
        //     validationErrors.companywebsite = "company website is required"
        // }

        // if(!formData.companyAddress.place.trim()) {
        //     validationErrors.companyaddress = "place is required"
        // }
        // if(!formData.companyAddress.city.trim()) {
        //     validationErrors.companyaddress = "city is required"
        // }
        // if(!formData.companyAddress.state.trim()) {
        //     validationErrors.companyaddress = "state is required"
        // }
        // if(!formData.companyAddress.landmark.trim()) {
        //     validationErrors.companyaddress = "landmark is required"
        // }
        // if(!formData.companyAddress.pincode.trim()) {
        //     validationErrors.companyaddress = "pincode is required"
        // }

        // if(!formData.password.trim()) {
        //     validationErrors.password = "password is required"
        // } else if(formData.password.length < 8){
        //     validationErrors.password = "password should be at least 8 char"
        // }

        // setErrors(validationErrors)

        
          const loader = async () => {
            try{
              const response = await axios.post('https://falt.onrender.com/api/user/register', formData)
              console.log(response.data)
              if(response.data.hasOwnProperty("user")) {
                alert('successfully registered with us')
                navigate("/login")  
              } else {
                alert(response.data.error ? response.data.error : "something went wrong")
              }
            } catch(e) {
              alert(e.message)
            }
          }
          loader()        
    }

    return (
        <div className='d-flex justify-content-center'>
          <Container fluid className="border border-1 border-primary rounded-2 mt-3 bg-gradient-dark">
          <h3 className="text-center text-success text-decoration-underline mt-3 ">Register with us</h3><br />
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingUsername"
                  label="username"
                  className="mb-2"
                >
                <Form.Control type="text" 
                    placeholder="enter your username" 
                    name="username" 
                    defaultValue={username} 
                    onChange={handleChange} 
                    required />
                    <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      please enter a valid username
                    </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>  
                <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control type="email" 
                    placeholder="enter your email"
                    name="email"
                    defaultValue={email} 
                    onChange={handleChange}
                    required />
                  <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                      please enter a valid email
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
          </Row>
          <Row>
            <Col>
              <PhoneInput
                country={"in"}
                placeholder="phone number"
                maxlength={10}
                value={mobile}
                onChange={handleMobileChange}
              /> 
              <p className='text-danger'> {isValid ? "Phone number is valid" : "Phone number is invalid"} </p>    
            </Col>
            <Col>  
              <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password"
                   placeholder="enter your password"
                   name="password"
                   defaultValue={password}
                   onChange={handleChange}
                   required />
                <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    please enter a valid password
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <h5 className="text-info">Company Details</h5>
          <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingCName"
                  label="company name"
                  className="mb-2"
                >
                <Form.Control type="text" 
                    placeholder="enter company name"
                    name="companyname"
                    defaultValue={companyName}
                    onChange={handleChange}
                    required />
                  <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                      please enter a valid company name
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>  
                <FloatingLabel controlId="floatingCWebsite" label="company website">
                <Form.Control type="text" 
                    placeholder="enter company website"
                    name="companywebsite"
                    defaultValue={companyWebsite}
                    onChange={handleChange}
                    required  />
                  <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                      please enter a valid company website
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
          </Row>
          <h5 className="text-info"> Company Address </h5>
          <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingPlace"
                  label="place"
                  className="mb-2"
                >
                <Form.Control type="text" 
                    placeholder="enter a valid place"
                    name="place"
                    defaultValue={companyAddress.place}
                    onChange={handleChange}
                    required />
                  <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                      please enter a valid place
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>  
                <FloatingLabel controlId="floatingLandmark" label="landmark">
                <Form.Control type="text" 
                    placeholder="enter landmark"
                    name="landmark"
                    defaultValue={companyAddress.landmark}
                    onChange={handleChange}
                    required />
                    <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        please enter a valid landmark
                    </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
          </Row>
          <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingCity"
                  label="City"
                  className="mb-2"
                >
                <Form.Control type="text" 
                    placeholder="enter a valid City"
                    name="city"
                    defaultValue={companyAddress.city}
                    onChange={handleChange} 
                    required />
                <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    please enter a valid city
                </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>  
                <FloatingLabel controlId="floatingState" label="State">
                <Form.Control type="text" 
                    placeholder="enter a valid State"
                    name="state"
                    defaultValue={companyAddress.state}
                    onChange={handleChange}
                    required />
                <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    please enter a valid state
                </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>  
                <FloatingLabel controlId="floatingPincode" label="pincode">
                <Form.Control type="text" 
                    placeholder="enter a valid pincode"
                    name="pincode"
                    defaultValue={companyAddress.pincode}
                    onChange={handleChange}
                    required />
                <Form.Control.Feedback> Looks good </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  please enter a valid pincode
                </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
          </Row>
          <Row className="mt-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
            style={{marginLeft: "40%", marginBottom: "4px"}}  
          />
          </Row>
          <div className="d-grid gap-2 col-2 mx-auto">
            <button type="submit" className="btn btn-outline-primary btn-sm">Submit</button>
          </div>
            <p style={{marginLeft: "40%", marginBottom: "4px"}}>Already have an account? <a href="/login">SignIn</a></p>
          </Form>
          </Container>
        </div>
    )
}

export default FreeTrail