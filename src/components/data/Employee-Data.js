import {Col, FloatingLabel, Form, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {MdDelete} from 'react-icons/md'
import {FaUserEdit} from 'react-icons/fa'
import {MdPersonAdd} from 'react-icons/md'
import jwtDecode from 'jwt-decode'
import { employeeDelete, getEmployees } from "../redux/actions/employee-actions"
import { useEffect, useState } from "react"
import EmployeeForm from "../forms/Employee-form"
import EmployeeEditForm from "../edit-forms/employee-edit"
import PaginationD from "./Pagination"
import { Link } from "react-router-dom"

const EmployeeData = () => {
    const dispatch = useDispatch()
    const [employeeShow, setEmployeeShow] = useState(false);
    const [employeeEditShow, setEmployeeEditShow] = useState(false);
    const [editObj, setEditObj] = useState('')
    const [empData, setEmpData] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5)
    const data = useSelector((state) => {
        return state.data.data
    })

    useEffect(() => {
        dispatch(getEmployees())
    }, [dispatch])

    console.log(data)

    const tokenData = jwtDecode(localStorage.getItem('token'))

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.employees.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.tasks.length / recordsPerPage)

    const filteredEmployees = () => {
        const result = currentRecords.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            } else if (a.name > b.name) {
                return 1
            } else {
                return 0
            }
        })
        console.log(result)
        const result1 = result.filter((emp) => {
            return emp.name.toLowerCase().includes(empData) || emp.mobile.toString().includes(empData) || emp.role.toLowerCase().includes(empData)
        })
        return result1
    }

    const employees = filteredEmployees()

    const handleEmployeeEdit = (obj) => {
        setEditObj(obj)
        setEmployeeEditShow(true)
    }

    const handleEmployeeDelete = (id) => {
        const confirm = window.confirm('Are you sure')
        if(confirm) {
            dispatch(employeeDelete(id))
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setEmployeeShow(true)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setEmpData(e.target.value)
    }

    return (
            <div>
                <EmployeeForm
                    show={employeeShow}
                    onHide={() => setEmployeeShow(false)}
                />
                <EmployeeEditForm
                    employee={editObj}
                    show={employeeEditShow}
                    onHide={() => setEmployeeEditShow(false)}
                />
                <div className="container-fluid mt-2">
                <Form>
                    <Row className="justify-content-end">
                        <Col xs={11}>
                            <FloatingLabel controlId="floatingSearch" label="Search">
                                <Form.Control type="text" placeholder="Search" value={empData} onChange={handleChange} style={{width: "200px", height:"30px"}}/>
                            </FloatingLabel>
                        </Col>
                        {tokenData.role === 'admin' ? <Col className="ms-auto">
                            <button className="btn btn-sm btn-light mt-3" style={{width:"45px", height: "45px"}} onClick={handleClick}><MdPersonAdd  style={{width: "25px", height:"25px"}}/></button>
                        </Col> : null }
                    </Row>
                </Form>

                </div>

        {tokenData.role === 'admin' ? <div className="container-fluid mt-1">
        <Table responsive className="table table-bordered table-sm table-hover align-middle text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Alt-Mobile</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => {
                    return (
                        <tr key={emp._id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/employee/${emp._id}`}> {emp.name} </Link></td>
                            <td>{emp.role}</td>
                            <td>{emp.email}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.alternateMobile}</td>
                            <td>{`${emp.address.place}\n ${emp.address.city}\n ${emp.address.state}-${emp.address.pincode}`}</td>
                            <td><button onClick={() => {handleEmployeeEdit(emp)}}> <FaUserEdit style={{width:'25px', height:'25px', color: "#FF7F50"}}/> </button>
                            <button className="mt-1" onClick={() => {handleEmployeeDelete(emp._id)}}><MdDelete style={{width:'25px', height:'25px', color: "#FF3333"}}/></button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div> : null }
        {tokenData.role === 'manager' ? <div className="container-fluid mt-1">
        <Table responsive className="table table-bordered table-sm table-hover align-middle text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Alt-Mobile</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.filter(emp1 => emp1.role === "fieldAgent").map((emp, index) => {
                    return (
                        <tr key={emp._id}>
                            <td>{index + 1}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.mobile}</td>
                            <td>{emp.alternateMobile}</td>
                            <td>{`${emp.address.place}\n ${emp.address.city}\n ${emp.address.state}-${emp.address.pincode}`}</td>
                            <td><button onClick={() => {handleEmployeeEdit(emp._id)}}> <FaUserEdit style={{width:'25px', height:'25px', color: "#FF7F50"}}/> </button>
                            <button className="mt-1" onClick={() => {handleEmployeeDelete(emp._id)}}><MdDelete style={{width:'25px', height:'25px', color: "#FF3333"}}/></button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div> : null}
        {employees.length > 0 ? <PaginationD 
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        /> : null }
        </div>
    )
}

export default EmployeeData