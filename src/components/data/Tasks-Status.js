import { Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import {GiCheckMark} from 'react-icons/gi'
import {MdPending} from 'react-icons/md'
import {GiBackwardTime} from 'react-icons/gi'
import jwtDecode from "jwt-decode"

const TasksStatus = () => {
    const data = useSelector((state) => {
        return state.data.data
    })
    const tokenData = jwtDecode(localStorage.getItem('token'))

    const tasks = data.tasks
    const tasksM = data.tasks.filter(task => task.assignedBy === tokenData.id )
    const tasksF = data.tasks.filter(task => task.assignedTo === tokenData.id)

    const pendingTasks = tasks.filter(task => task.status === 'pending')
    const completedTasks = tasks.filter(task => task.status === 'completed')
    const delayedTasks = tasks.filter(task => task.status === 'delayed')
    // < ------------------- manager --------------------------->
    const pendingTasksM = tasksM.filter(task => task.status === 'pending')
    const completedTasksM = tasksM.filter(task => task.status === 'completed')
    const delayedTasksM = tasksM.filter(task => task.status === 'delayed')
    // < ------------------- fieldAgents --------------------------->
    const pendingTasksF = tasksF.filter(task => task.status === 'pending')
    const completedTasksF = tasksF.filter(task => task.status === 'completed')
    const delayedTasksF = tasksF.filter(task => task.status === 'delayed')
    return (
        <div>
            {tokenData.role === 'admin' ? <Container fluid>
                <Card>
                    <Card.Header className="bg-light bg-gradient fs-2">Tasks</Card.Header>
                    <Card.Body >
                        <Row>
                        <Col>
                            <h5 className="text-center fs-3"> Total </h5>
                            <p className="text-center fs-4"> {tasks.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <MdPending style={{ width: "25px", height: "25px"}} /> Pending </h5>
                            <p className="text-center fs-4"> {pendingTasks.length}</p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiBackwardTime style={{ width: "25px", height: "25px"}} /> Delayed </h5>
                            <p className="text-center fs-4"> {delayedTasks.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiCheckMark style={{color: "green", width: "25px", height: "25px"}}/> Completed </h5>
                            <p className="text-center fs-4"> {completedTasks.length} </p>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container> : null}
            {tokenData.role === 'manager' ? <Container fluid>
                <Card>
                    <Card.Header className="bg-light bg-gradient fs-2">Tasks</Card.Header>
                    <Card.Body >
                        <Row>
                        <Col>
                            <h5 className="text-center fs-3"> Total </h5>
                            <p className="text-center fs-4"> {tasksM.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <MdPending style={{ width: "25px", height: "25px"}} /> Pending </h5>
                            <p className="text-center fs-4"> {pendingTasksM.length}</p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiBackwardTime style={{ width: "25px", height: "25px"}} /> Delayed </h5>
                            <p className="text-center fs-4"> {delayedTasksM.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiCheckMark style={{color: "green", width: "25px", height: "25px"}}/> Completed </h5>
                            <p className="text-center fs-4">  {completedTasksM.length} </p>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container> : null}
            {tokenData.role === 'fieldAgent' ? <Container fluid>
                <Card>
                    <Card.Header className="bg-light bg-gradient fs-2">Tasks</Card.Header>
                    <Card.Body >
                        <Row>
                        <Col>
                            <h5 className="text-center fs-3"> Total </h5>
                            <p className="text-center fs-4"> {tasksF.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <MdPending style={{ width: "25px", height: "25px"}} /> Pending </h5>
                            <p className="text-center fs-4"> {pendingTasksF.length}</p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiBackwardTime style={{ width: "25px", height: "25px"}} /> Delayed </h5>
                            <p className="text-center fs-4"> {delayedTasksF.length} </p>
                        </Col>
                        <Col>
                            <h5 className="text-center fs-3"> <GiCheckMark style={{color: "green", width: "25px", height: "25px"}}/> Completed </h5>
                            <p className="text-center fs-4"> {completedTasksF.length} </p>
                        </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container> : null}
        </div>
    )
}

export default TasksStatus