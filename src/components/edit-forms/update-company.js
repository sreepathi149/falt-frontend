import { useContext, useState } from "react"
import { Alert } from "../helpers/swal"
import { useNavigate } from "react-router-dom"
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import axios from "axios"
import { UserContext } from "../../App"

const UpdateCompany = () => {
    const {state, dispatch} = useContext(UserContext)
    const company = state.company
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const [companyWebsite, setCompanyWebsite] = useState('')
    const [companyAddress, setCompanyAddress] = useState({
      place: '',
      city: '',
      state:'',
      pincode: '',
      landmark:''
    })

    const handleChange = (e) => {
        if(e.target.name === 'companyname'){
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

      const handleClick = () => {
        navigate("/account")
      }
  
      const handleSubmit = (e) => {
        e.preventDefault();
          const formData = {
            companyName, companyWebsite, companyAddress
          }
          const loader = async () => {
            try{
              const response = await axios.put('https://falt.onrender.com/api/user/update-company-details', formData, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
              })
              console.log(response.data)
              if(response.data.hasOwnProperty("_id")) {
                dispatch({type: "EDIT_COMPANY", payload: response.data})
                Alert('successfully updated company details', "success", "account")
              } else {
                Alert(response.data.error ? response.data.error : "something went wrong")
              }
            } catch(e) {
              Alert(e.message, "warning", "update-company")
            }
          }
          loader()
      }
  
      return (
          <div className='d-flex justify-content-center'>
            <Container fluid className="border border-1 border-primary rounded-2 mt-3 bg-gradient-dark" style={{width:"500px"}}>
            <h3 className="text-center text-success text-decoration-underline mt-3 ">Update Company</h3>
            <Form onSubmit={handleSubmit}>
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
                      defaultValue={company.companyName}
                      onChange={handleChange}
                      required />
                  </FloatingLabel>
                </Col>
                <Col>  
                  <FloatingLabel controlId="floatingCWebsite" label="company website">
                  <Form.Control type="text" 
                      placeholder="enter company website"
                      name="companywebsite"
                      defaultValue={company.companyWebsite}
                      onChange={handleChange}
                      required  />
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
                      defaultValue={company.companyAddress?.place}
                      onChange={handleChange}
                      required />
                  </FloatingLabel>
                </Col>
                <Col>  
                  <FloatingLabel controlId="floatingLandmark" label="landmark">
                  <Form.Control type="text" 
                      placeholder="enter landmark"
                      name="landmark"
                      defaultValue={company.companyAddress?.landmark}
                      onChange={handleChange}
                      required />
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
                      defaultValue={company.companyAddress?.city}
                      onChange={handleChange} 
                      required />
                  </FloatingLabel>
                </Col>
                <Col>  
                  <FloatingLabel controlId="floatingState" label="State">
                  <Form.Control type="text" 
                      placeholder="enter a valid State"
                      name="state"
                      defaultValue={company.companyAddress?.state}
                      onChange={handleChange}
                      required />
                  </FloatingLabel>
                </Col>
                <Col>  
                  <FloatingLabel controlId="floatingPincode" label="pincode">
                  <Form.Control type="text" 
                      placeholder="enter a valid pincode"
                      name="pincode"
                      defaultValue={company.companyAddress?.pincode}
                      onChange={handleChange}
                      required />
                  </FloatingLabel>
                </Col>
            </Row>
                <Row className="d-flex justify-content-center ms-auto mt-2 mb-3">
                    <button className="btn btn-outline-primary btn-sm" style={{width:"125px", height:"40px", marginRight:"3px"}} onClick={handleClick}>Cancel</button>
                    <button type="submit" className="btn btn-outline-primary btn-sm" style={{width:"125px", height:"40px", marginLeft:"3px"}}>Submit</button>
                </Row>
            </Form>
            </Container>
          </div>
      )
}

export default UpdateCompany