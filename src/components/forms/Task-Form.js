import { useEffect, useState } from 'react'
import {Button, Col, FloatingLabel, Form, Modal, Row} from 'react-bootstrap'
import { taskAdd } from '../redux/actions/tasks-actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../redux/actions/CC-actions';
import { getEmployees } from '../redux/actions/employee-actions';


const TaskForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [company, setCompany] = useState('')
    const [client, setClient] = useState('')
    const [assignedBy, setAssignedBy] = useState('')
    const [assignedTo, setAssignedTo] = useState('')
    const [location, setLocation] = useState({
        lat:"",
        lng:""
    })
    const [dueDate, setDueDate] = useState('')

    const data = useSelector((state) => {
        return state.data.data
    })
    console.log(data)

    useEffect(() => {
        dispatch(getClients())
        dispatch(getEmployees())
    }, [dispatch])
    
    const clients = data.clients
    const employees = data.employees

    const handleChange = (e) => {
        if(e.target.name === "title") {
            setTitle(e.target.value)
        } else if(e.target.name === "description") {
            setDescription(e.target.value)
        } else if(e.target.name === "company") {
            setCompany(e.target.value)
        } else if(e.target.name === "client") {
            setClient(e.target.value)
        } else if(e.target.name === 'assignedBy'){
            console.log(e.target.value,"by")
            setAssignedBy(e.target.value)
        } else if(e.target.name === 'assignedTo') {
            console.log(e.target.value,"to")
            setAssignedTo(e.target.value)
        } else if(e.target.name === 'lat') {
            setLocation({...location, lat: e.target.value})
        } else if(e.target.name === 'lng') {
            setLocation({...location, lng: e.target.value})
        } else if(e.target.name === 'dueDate') {
            setDueDate(e.target.value)
        } 
    }

    const handleSubmit = (e) => {
    e.preventDefault();
        const formData = {
        title, description, company, client, assignedBy, assignedTo, dueDate, location 
        }
        const resetForm = () => {
            setTitle('')
            setDescription('')
            setClient('')
            setAssignedBy('')
            setAssignedTo('')
            setDueDate('')
            setLocation({
                lat:'',
                lng: ''
            })
        }
        dispatch(taskAdd(formData, resetForm)) 
        props.onHide()
        navigate("/task-management") 
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
                Add Tasks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
            <h4>Tasks Details</h4>
            <Form onSubmit={handleSubmit}>
                <Row>
                <Col>
                        <Form.Select size="lg" name="title" onChange={handleChange}>
                            <option>Select title...</option>
                            {clients.map((client) => {
                                return <option key={client._id} value={client.requirement?.title}>{client.requirement?.title}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select size="lg" name="description" onChange={handleChange}>
                            <option>Select description...</option>
                            {clients.map((client) => {
                                return <option key={client._id} value={client.requirement?.body}>{client.requirement?.body}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-2" onChange={handleChange}>
                    <Col>
                        <Form.Select size="lg" name="assignedBy" onChange={handleChange}>
                            <option>Select assignedBy...</option>
                            {employees.filter(emp => emp.role === 'manager').map(emp1 => {
                                return <option key={emp1._id} value={emp1._id}>{emp1.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select size="lg" name="assignedTo" onChange={handleChange}>
                            <option>Select assignedto ...</option>
                            {employees.filter(emp => emp.role === 'fieldAgent').map(emp1 => {
                                return <option key={emp1._id} value={emp1._id}>{emp1.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                    <Form.Select size="lg" name="company" onChange={handleChange}>
                            <option>Select Company...</option>
                            <option value="65040918c0b5041b9231ef01">ksr constructions</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    <Form.Select size="lg" name="client" onChange={handleChange}>
                            <option>Select Client...</option>
                            {clients.map((client) => {
                                return <option key={client._id} value={client._id}>{client.name}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <h5 className="text-info mt-2">Location </h5>
                <Row className="mt-2">
                    <Col>
                    <Form.Select size="lg"name="lat" onChange={handleChange}>
                            <option>Select Lat...</option>
                            {clients.map((client, index) => {
                                return <option key={client._id} value={`${client.location.latitude}`}>{` ${index+1}.${client.location.latitude}`}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col>
                    <Form.Select size="lg" name="lng" onChange={handleChange}>
                            <option>Select lng...</option>
                            {clients.map((client, index) => {
                                return <option key={client._id} value={`${client.location.longitude}`}>{`${index+1}.${client.location.longitude}`}</option>
                            })}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                    <FloatingLabel
                        controlId="floatingDate"
                        label="Date"
                        className="mb-2"
                        >
                        <Form.Control type="date" 
                            placeholder="enter a date"
                            name="dueDate"
                            defaultValue={dueDate}
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
export default TaskForm

