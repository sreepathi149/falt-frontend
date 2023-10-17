import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Button, Col, FloatingLabel, Form, Modal, Row} from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import {clientEdit} from '../redux/actions/CC-actions';


const ClientEditForm = (props) => {
    const {client} = props
    //console.log(req)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = client._id
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [alternateMobile, setAlternateMobile] = useState()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [place, setPlace] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [landmark, setLandmark] = useState()
    const [pincode, setPincode] = useState()
    
    

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
        } else if(e.target.name === 'alternateMobile') {
            setAlternateMobile(e.target.value)
        } else if(e.target.name === 'place') {
            setPlace( e.target.value)
        } else if(e.target.name === 'city') {
            setCity(e.target.value)
        } else if(e.target.name === 'state') {
            setState(e.target.value)
        } else if(e.target.name === 'pincode') {
            setPincode(e.target.value)
        } else if(e.target.name === 'landmark') {
            setLandmark(e.target.value)
        } else if(e.target.name === 'title') {
            setTitle(e.target.value)
        } else if(e.target.name === 'body') {
            setBody(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
          const formData = {
            id,
            name,
            email,
            mobile,
            alternateMobile,
            address:{place,city,state,pincode, landmark}, 
            requirement:{title, body} 
          }
          dispatch(clientEdit(formData)) 
          props.onHide()
          navigate("/clients-categories")
            
    }
     
  
    return (
            <Modal
                {...props}
                size="md"
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header className='bg-info bg-gradient' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Client
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
                            defaultValue={client.name} 
                            onChange={handleChange} 
                            required />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="text" 
                            placeholder="enter your email"
                            name="email"
                            defaultValue={client.email} 
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
                    <Col>  
                    <FloatingLabel controlId="floatingAltMobile" label="Alt-Mobile">
                        <Form.Control type="text"
                            placeholder="enter your Alt Mobile"
                            name="alternateMobile"
                            defaultValue={client.alternateMobile}
                            onChange={handleChange}
                            required />
                        </FloatingLabel>
                    </Col>
                </Row>
                <h5 className="text-info mt-2"> Requirement </h5>
                <Row>
                    <Col>
                    <FloatingLabel controlId="floatingTitle" label="Title">
                        <Form.Control type="text"
                            placeholder="enter title"
                            name="title"
                            defaultValue={client.requirement?.title}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                    <FloatingLabel controlId="floatingBody" label="Body">
                        <Form.Control type="textarea"
                            placeholder="enter body"
                            name="body"
                            defaultValue={client.requirement?.body}
                            onChange={handleChange}
                            />
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
                            defaultValue={client.address?.place}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingLandmark" label="landmark">
                        <Form.Control type="text" 
                            placeholder="enter landmark"
                            name="landmark"
                            defaultValue={client.address?.landmark}
                            onChange={handleChange}
                            />
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
                            defaultValue={client.address?.city}
                            onChange={handleChange} 
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingState" label="State">
                        <Form.Control type="text" 
                            placeholder="enter a valid State"
                            name="state"
                            defaultValue={client.address?.state}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingPincode" label="pincode">
                        <Form.Control type="text" 
                            placeholder="enter a valid pincode"
                            name="pincode"
                            defaultValue={client.address?.pincode}
                            onChange={handleChange}
                            />
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
export default ClientEditForm

