import { useSelector } from "react-redux"
import jwtDecode from "jwt-decode"
import { Card, Col, Row } from "react-bootstrap"
import {GoArrowLeft} from 'react-icons/go'
import { Link } from "react-router-dom"
import PaginationD from "./Pagination"
import { useState } from "react"


const UploadsData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2)

    const data = useSelector((state) => {
        return state.data.data
    })
    const tokenData = jwtDecode(localStorage.getItem("token"))
    

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.tasks.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.tasks.length / recordsPerPage)

    const tasks = currentRecords
    const tasksM = currentRecords.filter(task => task.assignedBy === tokenData.id )
    const tasksF = currentRecords.filter(task => task.assignedTo === tokenData.id)

    return (
        <section>
            <div className="container mt-2">
                <Link to="/task-management">{<GoArrowLeft style={{width: "25px", height:"25px"}}/>} Back </Link> 
            </div>
            {tokenData.role === "admin" ? <div className="container mt-3 mb-3">
                {tasks.map((task) => {
                    return (
                        <div key={task._id} className="mb-3">
                            <Card>
                                <Card.Header className="bg-info bd-gradient text-white">
                                    <h5> Title - {task.title} </h5>
                                    <h5> Client - {task.client?.name} </h5> 
                                    <h5> Agent  - {task.assignedTo?.name} </h5>
                                </Card.Header>
                                <Card.Body  className="bg-light bd-gradient">
                                    <Row>        
                                        {task.fieldStatus.map((ele, index) => {
                                            return(
                                                <Col key={index} xs="auto" >
                                                    <Card style={{width: "18rem", height:"16rem"}} className="bg-danger bd-gradient">
                                                        <Card.Body><img src={ele.Location} alt="" style={{width: "16rem", height:"14rem"}} /> </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Card.Body>  
                            </Card>
                        </div>
                    )
                })}
                {tasks.length > 0 ? <PaginationD 
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> : null }
            </div> : null }
            {tokenData.role === "manager" ? <div>
                {tasksM.map((task) => {
                    return (
                        <div key={task._id}>
                            <h5>{task.title} - {task.client?.name} - {task.assignedTo?.name} </h5>
                            <Row>        
                                {task.fieldStatus.map((ele, index) => {
                                    return(
                                        <Col key={index} xs="auto" >
                                            <Card>
                                                <Card.Body><img src={ele.Location} alt="" /> </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                })}
                {tasksM.length > 0 ? <PaginationD 
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> : null }
            </div> : null }
            {tokenData.role === "fieldAgent" ? <div>
                {tasksF.map((task) => {
                    return (
                        <div key={task._id}>
                            <h5>{task.title} - {task.client?.name} - {task.assignedTo?.name} </h5>
                            <Row>        
                                {task.fieldStatus.map((ele, index) => {
                                    return(
                                        <Col key={index} xs="auto" >
                                            <Card>
                                                <Card.Body><img src={ele.Location} alt="" /> </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    )
                })}
                {tasksF.length > 0 ? <PaginationD 
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /> : null }
            </div> : null }
            
        </section>
    )
}

export default UploadsData