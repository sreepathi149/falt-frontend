import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Col, Row, Spinner } from "react-bootstrap"
import { GoArrowLeft } from "react-icons/go"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const Employee = () => {
    const {employeeId} = useParams()
    const [employee, setEmployee] = useState({})
    //const [company, setCompany] = useState({})

    const data = useSelector((state) => {
        return state.data.data
    })
    console.log(data)

    const filteredData = () => {
        const result = data.tasks.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            } else if (a.title > b.title) {
                return 1
            } else {
                return 0
            }
        })
        if(employee.role === 'manager') {
            const result1 = result.filter(task => task.assignedBy === employee._id )
            return result1
        } else {
            const result1 = result.filter(task => task.assignedTo?._id === employee._id )
            return result1
        }
        
    }

    const tasks = filteredData()

    useEffect(() => {
        const loader = async () => {
            try {
                const response = await axios.get(`http://localhost:4455/api/employee/${employeeId}`, {
                    headers: {
                        'authorization' : localStorage.getItem('token')
                    }
                })
                console.log(response)
                if(response.data.hasOwnProperty("_id")) {
                    setEmployee(response.data)
                    // const result = await axios.get(`https://falt.onrender.com/api/company/${response.data.company}`, {
                    //     headers: {
                    //         'authorization' : localStorage.getItem('token')
                    //     }
                    // })
                    // if(result.data.hasOwnProperty("_id")) {
                    //     setEmployee(response.data)
                    //     setCompany(result.data)
                    // } else {
                    //     alert(response.data?.message)
                    // }
                } else {
                    alert(response.data?.message)
                }
            } catch(e) {
                alert(e.message)
            }
        }
        loader()
    }, [employeeId])


    return (
        <section>
            <div className="container mt-2">
                <Link to="/employees">{<GoArrowLeft style={{width: "25px", height:"25px"}}/>} Back </Link> 
            </div>
            {Object.keys(employee).length > 0 ? <div className="container mt-3">
                <Card>
                    <Card.Header>
                        <h4>Name: {employee.name.toUpperCase()} </h4>
                        <h4>Designation: {employee.role.toUpperCase()} </h4>
                        <h4>ReportingTo: {employee.reportTo?.toUpperCase()} </h4>
                    </Card.Header>
                    <Card.Body>
                        <h5> Tasks Assigned </h5><hr/>
                            <Row ><Col className="d-flex justify-content-center"><h6>Name</h6></Col><Col className="d-flex justify-content-center">DueDate</Col><Col className="d-flex justify-content-center"><h6>status</h6></Col></Row> 
                            {tasks.map((task) => {
                                return <Row key={task._id}>
                                    <Col className="d-flex justify-content-center">{task.title}</Col>
                                    <Col className="d-flex justify-content-center">{task.dueDate.split('T')[0]}</Col>
                                    <Col className="d-flex justify-content-center">{task.status}</Col></Row>
                            })}
                    </Card.Body>
                </Card>
            </div> : <Spinner animation="grow" variant="primary" size="lg" /> }
        </section>
    )
}

export default Employee