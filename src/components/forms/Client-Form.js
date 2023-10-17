import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Button, Col, FloatingLabel, Form, Modal, Row} from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { clientAdd } from '../redux/actions/CC-actions';


const ClientForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [alternateMobile, setAlternateMobile] = useState('')
    const [password, setPassword] = useState('')
    const [company, setCompany] = useState('')
    const [requirement, setRequirement] = useState({
        title: '',
        body: ''
    })
    const [address, setAddress] = useState({
        place: '',
        city: '',
        state:'',
        pincode: '',
        landmark:''
      })

    const handleMobileChange = (value) => {
        setMobile(value)
      }
      const handleChange = (e) => {
        if(e.target.name === "name") {
          setName(e.target.value)
        } else if(e.target.name === "email") {
          setEmail(e.target.value)
        } else if(e.target.name === "mobile") {
          setMobile(e.target.value)
        } else if(e.target.name === "password") {
          setPassword(e.target.value)
        } else if(e.target.name === 'alternateMobile') {
            setAlternateMobile(e.target.value)
        } else if(e.target.name === 'place') {
            setAddress({...address, place: e.target.value})
        } else if(e.target.name === 'city') {
            setAddress({...address, city: e.target.value})
        } else if(e.target.name === 'state') {
            setAddress({...address, state: e.target.value})
        } else if(e.target.name === 'pincode') {
            setAddress({...address, pincode: e.target.value})
        } else if(e.target.name === 'landmark') {
            setAddress({...address, landmark: e.target.value})
        } else if(e.target.name === 'company') {
            setCompany(e.target.value)
        } else if(e.target.name === 'title') {
            setRequirement({...requirement, title: e.target.value})
        } else if(e.target.name === 'body') {
            setRequirement({...requirement, body: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            mobile,
            password, alternateMobile, address, company, requirement 
        }
        const resetForm = () => {
            setName('')
            setEmail('')
            setAddress({
                place: '',
                city: '',
                state:'',
                pincode: '',
                landmark:''
            })
            setPassword('')
            setMobile('')
            setAlternateMobile('')
            setCompany('')
            setRequirement({
                title:'',
                body:''
            })
        }
        dispatch(clientAdd(formData,resetForm)) 
        props.onHide()
        navigate("/clients-categories")       
    }
     
  
    return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header className='bg-info bg-gradient' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add Client
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
            <h4>Client Details</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <FloatingLabel
                        controlId="floatingUsername"
                        label="name"
                        className="mb-2"
                        >
                        <Form.Control type="text" 
                            placeholder="enter your name" 
                            name="name" 
                            defaultValue={name} 
                            onChange={handleChange} 
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="text" 
                            placeholder="enter your email"
                            name="email"
                            defaultValue={email} 
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <PhoneInput
                            country={"in"}
                            placeholder="phone number"
                            value={mobile}
                            onChange={handleMobileChange}
                        />     
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password"
                            placeholder="enter your password"
                            name="password"
                            defaultValue={password}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                    <FloatingLabel controlId="floatingAltMobile" label="Alt-Mobile">
                        <Form.Control type="text"
                            placeholder="enter your Alt Mobile"
                            name="alternateMobile"
                            defaultValue={alternateMobile}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Form.Select size="lg">
                            <option>Select Company...</option>
                            <option value="manager">Manager</option>
                            <option value="field-agent">Field Agent</option>
                        </Form.Select>
                    </Col>
                </Row>
                <h5 className="text-info mt-2"> Requirement </h5>
                <Row>
                    <Col>
                    <FloatingLabel controlId="floatingTitle" label="Title">
                        <Form.Control type="text"
                            placeholder="enter title"
                            name="title"
                            defaultValue={requirement.title}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                    <FloatingLabel controlId="floatingBody" label="Body">
                        <Form.Control type="textarea"
                            placeholder="enter body"
                            name="body"
                            defaultValue={requirement.body}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                </Row>
                <h5 className="text-info mt-2">Address </h5>
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
                            defaultValue={address.place}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingLandmark" label="landmark">
                        <Form.Control type="text" 
                            placeholder="enter landmark"
                            name="landmark"
                            defaultValue={address.landmark}
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
                            defaultValue={address.city}
                            onChange={handleChange} 
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingState" label="State">
                        <Form.Control type="text" 
                            placeholder="enter a valid State"
                            name="state"
                            defaultValue={address.state}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingPincode" label="pincode">
                        <Form.Control type="text" 
                            placeholder="enter a valid pincode"
                            name="pincode"
                            defaultValue={address.pincode}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                </Row>  
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button type="submit" variant="outline-primary" size="md" >Save</Button>
                    <Button variant="outline-secondary"  size="sm" onClick={props.onHide}>Close</Button>
                </div>    
            </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>   
    )
}
export default ClientForm

