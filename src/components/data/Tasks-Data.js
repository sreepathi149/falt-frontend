import {Col, FloatingLabel, Form, Row, Table } from "react-bootstrap"
import { useDispatch } from "react-redux"
import {MdDelete} from 'react-icons/md'
import {GrAdd} from 'react-icons/gr'
import {MdUploadFile} from 'react-icons/md'
import {FaUserEdit} from 'react-icons/fa'
import jwtDecode from 'jwt-decode'
import { fieldUploads, getTask, taskDelete } from "../redux/actions/tasks-actions"
import { useState } from "react"
import TaskForm from "../forms/Task-Form"
import TaskEditForm from "../edit-forms/task-edit"
import { Link } from "react-router-dom"


const TasksData = (props) => {
    const {currentRecords} = props
    const dispatch = useDispatch()
    const [files, setFiles] = useState([])
    const [taskData, setTaskData] = useState('')
    const [taskShow, setTaskShow] = useState(false)
    const [taskEditShow, setTaskEditShow] = useState(false)
    const [editObj, setEditObj] = useState({})

    const tokenData = jwtDecode(localStorage.getItem('token'))

    const filteredTasks = () => {
        const result = currentRecords.sort((a, b) => {
            if (new Date(a.dueDate) < new Date(b.dueDate)) {
                return -1
            } else if (new Date(a.dueDate) > new Date(b.dueDate)) {
                return 1
            } else {
                return 0
            }
        })
        const result1 = result.filter((task) => {
            return task.title.toLowerCase().includes(taskData) || task.status.toLowerCase().includes(taskData)
        })
        return result1
    }

    const tasks = filteredTasks()

    const handleTasksEdit = (obj) => {
        setEditObj(obj)
        setTaskEditShow(true)
    }

    const handleTasksDelete = (id) => {
        const confirm = window.confirm('Are you sure')
        if(confirm) {
            dispatch(taskDelete(id))
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setTaskShow(true)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setTaskData(e.target.value)
    }

    const handleFile = (e) => {
        setFiles([...files, ...e.target.files])
    }

    const handleFileUploads = (id) => {
        const formData = new FormData()
        files.map(file => formData.append('fieldStatus', file))
        dispatch(fieldUploads(id, formData))
        setFiles([])
    }

    return (
        <section>
            <TaskForm
                show={taskShow}
                onHide={() => setTaskShow(false)}
            />
            <TaskEditForm
                task={editObj}
                show={taskEditShow}
                onHide={() => setTaskEditShow(false)}
            />
            <div className="container-fluid ms-auto mt-2">
            <Form>
                <Row>
                    <Col xs={11}>
                        <FloatingLabel controlId="floatingSearch" label="Search">
                            <Form.Control type="text" placeholder="Search" value={taskData} onChange={handleChange} style={{width: "200px", height:"30px"}}/>
                        </FloatingLabel>
                    </Col>
                    {tokenData.role === "fieldAgent" ? null : <Col className="ms-auto">
                        <button className="btn btn-sm btn-light mt-3" style={{width:"45px", height: "45px"}} onClick={handleClick}><GrAdd  style={{width: "30px", height:"30px"}}/></button>
                    </Col>}
                </Row>
            </Form>
            </div>

        {tokenData.role === 'admin' ? <div className="container-fluid mt-3 mb-3">
        <Table responsive className="table table-bordered table-sm table-hover align-middle text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>AssignedBy</th>
                    <th>AssignedTo</th>
                    <th>Client</th>
                    <th>Lat</th>
                    <th>Lng</th>
                    <th>DueDate</th>
                    <th>Status</th>
                    <th>FieldStatus</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => {
                    return (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/view-client/${task._id}`} >{task.title}</Link> </td>
                            <td>{task.description}</td>
                            <td>{`${task.assignedBy}`}</td>
                            <td>{`${task.assignedTo.name}`}</td>
                            <td>{`${task.client.name}`}</td>
                            <td>{task.location.lat}</td>
                            <td>{task.location.lng}</td>
                            <td>{task.dueDate.split('T')[0]}</td>
                            <td>{task.status}</td>
                            <td>
                                <input type="file" onChange={handleFile} multiple />
                                <button style={{width: "45px"}} onClick={() => {handleFileUploads(task._id)}}> <MdUploadFile style={{width:'25px', height:'25px', color: "#FF7F50"}}/></button>
                            </td>
                            <td>
                                <button onClick={() => {handleTasksEdit(task)}}> <FaUserEdit style={{width:'25px', height:'25px', color: "#FF7F50"}}/> </button>
                                <button className="mt-1" onClick={() => {handleTasksDelete(task._id)}}><MdDelete style={{width:'25px', height:'25px', color: "#FF3333"}}/></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div> : null}
        {tokenData.role === 'manager' ? <div className="container-fluid mt-3 mb-3">
        <Table responsive className="table table-sm table-hover align-middle text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>AssignedBy</th>
                    <th>AssignedTo</th>
                    <th>Client</th>
                    <th>Lat</th>
                    <th>Lng</th>
                    <th>DueDate</th>
                    <th>Status</th>
                    <th>FieldStatus</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.filter(task1 => tokenData.id === task1.assignedBy).map((task, index) => {
                    return (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/view-client/${task._id}`} >{task.title}</Link> </td>
                            <td>{task.description}</td>
                            <td>{task.client?.name}</td>
                            <td>{task.assignedBy?.name}</td>
                            <td>{task.assignedTo?.name}</td>
                            <td>{task.location.lat}</td>
                            <td>{task.location.lng}</td>
                            <td>{task.status}</td>
                            <td>
                                <input type="file" onChange={handleFile} multiple />
                                <button style={{width: "45px"}} onClick={() => {handleFileUploads(task._id)}}> <MdUploadFile style={{width:'25px', height:'25px', color: "#FF7F50"}}/></button>
                            </td>
                            <td><button onClick={() => {handleTasksEdit(task._id)}}> <FaUserEdit style={{width:'25px', height:'25px', color: "#FF7F50"}}/> </button>
                            <button className="mt-1" onClick={() => {handleTasksDelete(task._id)}}><MdDelete style={{width:'25px', height:'25px', color: "#FF3333"}}/></button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>: null}
        {tokenData.role === 'fieldAgent' ? <div className="container-fluid mt-3 mb-3">
        <Table responsive className="table table-sm table-hover align-middle text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>AssignedBy</th>
                    <th>Client</th>
                    <th>DueDate</th>
                    <th>Status</th>
                    <th>FieldStatus</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.filter(task1 => tokenData.id === task1.assignedTo).map((task, index) => {
                    return (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/view-client/${task._id}`} >{task.title}</Link> </td>
                            <td>{task.description}</td>
                            <td>{task.client}</td>
                            <td>{task.assignedBy}</td>
                            <td>{task.status}</td>
                            <td>
                                <input type="file" onChange={handleFile} multiple />
                                <button style={{width: "45px"}} onClick={() => {handleFileUploads(task._id)}}> <MdUploadFile style={{width:'25px', height:'25px', color: "#FF7F50"}}/></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>: null}
        </section>
    )
}

export default TasksData