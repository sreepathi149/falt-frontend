import { useState } from 'react'
import {Button, Col, FloatingLabel, Form, Modal, Row} from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import jwtDecode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {employeeEdit } from '../redux/actions/employee-actions';


const EmployeeEditForm = (props) => {
    const {employee} = props
    const id = employee._id
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [alternateMobile, setAlternateMobile] = useState('')
    const [role, setRole] = useState('')
    const [reportTo, setReportTo] = useState('')
    const [address, setAddress] = useState({
        place: '',
        city: '',
        state:'',
        pincode: '',
        landmark:''
    })

    const tokenData = jwtDecode(localStorage.getItem('token'))
    const data = useSelector((state) => {
        return state.data.data
    })


      //const dispatch = useDispatch()
    const employees = data.employees.filter(emp => emp.role === "manager")


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
        } else if(e.target.name === 'role'){
            console.log(e.target.value)
          setRole(e.target.value)
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
        } else if(e.target.name === 'reportTo') {
            setReportTo(e.target.value)
            console.log(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id,
            name,
            email,
            mobile,
            alternateMobile, role, address, reportTo 
        }
        dispatch(employeeEdit(formData)) 
        props.onHide()
        navigate("/employees") 
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
                Update Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
            <h4>Employee Details</h4>
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
                            defaultValue={employee.name} 
                            onChange={handleChange} 
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="text" 
                            placeholder="enter your email"
                            name="email"
                            defaultValue={employee.email} 
                            onChange={handleChange}
                            />
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
                            defaultValue={employee.alternateMobile}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                {tokenData.role === "admin" ? <Row className="mt-2">
                    <Col>
                        <Form.Select size="lg" name="role" onChange={handleChange}>
                            <option>Select Role...</option>
                            <option  defaultValue="manager">manager</option>
                            <option defaultValue="fieldAgent">fieldAgent</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    <Form.Select size="lg" name="reportTo" onChange={handleChange}>
                            <option>Select Reported to ...</option>
                            <option  value="Company">Company</option>
                            {employees.map((emp) => {
                                return <option key={emp._id} value={emp._id}>{emp.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row> : null}
                <Row className="mt-2">
                    <Col>
                    <Form.Select size="lg" name="company" onChange={handleChange}>
                            <option>Select Company...</option>
                            <option  defaultValue="65040918c0b5041b9231ef01">mr constructions</option>
                        </Form.Select>
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
                            defaultValue={employee.address?.place}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingLandmark" label="landmark">
                        <Form.Control type="text" 
                            placeholder="enter landmark"
                            name="landmark"
                            defaultValue={employee.address?.landmark}
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
                            defaultValue={employee.address?.city}
                            onChange={handleChange} 
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingState" label="State">
                        <Form.Control type="text" 
                            placeholder="enter a valid State"
                            name="state"
                            defaultValue={employee.address?.state}
                            onChange={handleChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>  
                        <FloatingLabel controlId="floatingPincode" label="pincode">
                        <Form.Control type="text" 
                            placeholder="enter a valid pincode"
                            name="pincode"
                            defaultValue={employee.address?.pincode}
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
export default EmployeeEditForm

