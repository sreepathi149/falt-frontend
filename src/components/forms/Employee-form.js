import { useEffect, useRef, useState } from 'react'
import {Button, Col, FloatingLabel, Form, Modal, Row} from 'react-bootstrap'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import {useDispatch, useSelector} from 'react-redux'
import { addEmployee, getEmployees } from '../redux/actions/employee-actions';

const EmployeeForm = (props) => {
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        return state.data.data
    })

    console.log(data, "emp")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [alternateMobile, setAlternateMobile] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')
    const [reportTo, setReportTo] = useState('')
    const [address, setAddress] = useState({
        place: '',
        city: '',
        state:'',
        pincode: '',
        landmark:''
      })

      useEffect(() => {
        dispatch(getEmployees())
      },[dispatch])

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
        } else if(e.target.name === "password") {
          setPassword(e.target.value)
        } else if(e.target.name === 'role'){
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
        } else if(e.target.name === 'company') {
            setCompany(e.target.value)
        } else if(e.target.name === 'reportTo') {
            setReportTo(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            mobile,
            password, alternateMobile, role, address, company, reportTo 
        }
        const resetForm = () => {
            setName('')
            setEmail('')
            setMobile('')
            setPassword('')
            setAlternateMobile('')
            setRole('')
            setReportTo('')
            setAddress({
                place: '',
                city: '',
                state:'',
                pincode: '',
                landmark:'' 
            })
        }
        dispatch(addEmployee(formData, resetForm)) 
        props.onHide()
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
                Add Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
            <h4>Employee Details</h4>
            <Form onSubmit={handleSubmit} autoComplete='off'>
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
                        <Form.Select size="lg" name="role" onChange={handleChange}>
                            <option>Select Role...</option>
                            <option  value="manager">manager</option>
                            <option value="fieldAgent">fieldAgent</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select size="lg" name="reportTo" onChange={handleChange}>
                            <option>Select Reported to ...</option>
                            <option  value="Company">Company</option>
                            {employees.map((emp) => {
                                return <option key={emp._id} value={emp.name}>{emp.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                    <Form.Select size="lg" name="company" onChange={handleChange}>
                            <option>Select Company...</option>
                            <option  defaultValue="65040918c0b5041b9231ef01">ksr constructions</option>
                            <option value="field-agent">Field Agent</option>
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
export default EmployeeForm

