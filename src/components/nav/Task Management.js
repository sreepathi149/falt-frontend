import {Container, Row,Col, Button} from 'react-bootstrap'
import {GrTask} from 'react-icons/gr'
import task from '../../images/home/task.jpg'
import '../../css/tracking.css'
import {Link} from 'react-router-dom'
import TasksData from '../data/Tasks-Data'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import PaginationD from '../data/Pagination'


const TaskManagement = () => {
    const data = useSelector((state) => {
        return state.data.data
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5)

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.tasks.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.tasks.length / recordsPerPage)

    return (
        <section>
            {localStorage.getItem('token') ? <div>
            <Container fluid>
                <TasksData currentRecords={currentRecords}/>
                {currentRecords.length > 0 ? <PaginationD 
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> : null}
            </Container>
            </div> :
            <Container fluid>
                <Row>
                    <Col className='col-sm-6 mt-5'>
                    <p className='text-center' style={{fontSize:"30px"}}><GrTask></GrTask> Task <strong style={{color:"red"}}>Management</strong></p>
                    <br></br>
                    <p className='text-left d-flex justify-content-center flex-column' style={{padding:"5px"}}>
                        Ensure field team is visiting their client and Collect data via custom photos & forms and 
                        ensures your field team is at the client location before allowing them to start the task.       
                    </p>
                    <p className='text-left d-flex justify-content-center flex-column' style={{padding:"5px"}}>
                    Makes sure that the field executive is in range of the client before allowing them to start the task.
                    </p>
                    <Button variant="outline-primary" size="lg" as={Link} to="/freetrail">Get Free Trail</Button>
                    </Col>
                    <Col className='col-md-6 mt-5 align-items-center'>
                    <img src={task} className='image-fluid animated d-flex' alt="home img" style={{width:"650px"}}></img>
                    </Col>
                </Row>
            </Container>}
        </section>
    )
}
    
export default TaskManagement