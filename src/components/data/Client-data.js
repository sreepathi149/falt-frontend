import {Col, Container, FloatingLabel, Form, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {MdDelete} from 'react-icons/md'
import {MdPersonAdd} from 'react-icons/md'
import {FaUserEdit} from 'react-icons/fa'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from "react"
import ClientForm from "../forms/Client-Form"
import {clientDelete, getClients } from "../redux/actions/CC-actions"
import ClientEditForm from "../edit-forms/client-edit"
import PaginationD from "./Pagination"


const ClientData = () => {
    const [clientData, setClientData] = useState('')
    const [clientShow, setClientShow] = useState(false)
    const [clientEditShow, setClientEditShow] = useState(false)
    const [editObj, setEditObj] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5)
    const dispatch = useDispatch()
    const data = useSelector((state) => {
        return state.data.data
    })

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.clients.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.clients.length / recordsPerPage)

    const filteredClients = () => {
        const result = currentRecords.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            } else if (a.name > b.name) {
                return 1
            } else {
                return 0
            }
        })
        const result1 = result.filter((client) => {
            return client.name.toLowerCase().includes(clientData) || client.mobile.toString().includes(clientData) 
        })
        return result1
    }
    const clients = filteredClients()

    const tokenData = jwtDecode(localStorage.getItem('token'))


    const handleclientsEdit = (data) => {
        setEditObj(data)
        setClientEditShow(true)
    }

    const handleclientsDelete = (id) => {
        const confirm = window.confirm('Are you sure')
        if(confirm) {
            dispatch(clientDelete(id))
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setClientShow(true)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setClientData(e.target.value)
    }
    
    return (
        <section>
            <div>
            <Container fluid>
                <ClientForm
                    show={clientShow}
                    onHide={() => setClientShow(false)}
                />
                <ClientEditForm
                    client={editObj}
                    show={clientEditShow}
                    onHide={() => setClientEditShow(false)}
                />
                <div className="container-fluid ms-auto mt-2">
                    <Form>
                        <Row className="justify-content-end">
                            <Col>
                                <FloatingLabel controlId="floatingClientSearch" label="Search">
                                    <Form.Control type="text" placeholder="Search" value={clientData} onChange={handleChange} style={{width: "200px", height:"30px"}}/>
                                </FloatingLabel>
                            </Col>
                            {tokenData.role === "admin" ? <Col className="d-flex justify-content-end">
                                <button className="btn btn-sm btn-light mt-2" style={{width:"45px", height: "45px"}} onClick={handleClick}><MdPersonAdd  style={{width: "30px", height:"30px"}}/></button>
                            </Col> : null }
                        </Row>
                    </Form>
                </div> 
                    <div className="container-fluid mt-3">
                        <Table responsive className="table table-bordered table-sm table-hover align-middle text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client, index) => {
                                    return (
                                        <tr key={client._id}>
                                            <td>{index + 1}</td>
                                            <td>{client.name}</td>
                                            <td>{client.email}</td>
                                            <td>{client.mobile}</td>
                                            <td><button onClick={() => {handleclientsEdit(client)}}> <FaUserEdit style={{width:'25px', height:'25px', color: "#FF7F50"}}/> </button>
                                            <button className="mt-1" onClick={() => {handleclientsDelete(client._id)}}><MdDelete style={{width:'25px', height:'25px', color: "#FF3333"}}/></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>  
                    {clients.length > 0 ? <PaginationD 
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> : null }  
            </Container>
            </div>
        </section>
    )
}

export default ClientData