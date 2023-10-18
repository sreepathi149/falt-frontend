import { useContext, useEffect } from "react";
import jwtDecode from "jwt-decode"
import { Card, Col, Row } from "react-bootstrap"
import {BsCircle} from "react-icons/bs"
import {RiDeleteRow} from "react-icons/ri"
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { UserContext } from "../../App";
import axios from "axios";

const Profile = () => {
    const {state, dispatch} = useContext(UserContext)
    const user = state.user
    const company = state.company
    const employee = state.employee
    
    const tokenData = jwtDecode(localStorage.getItem('token'))
    console.log(tokenData)

    useEffect(() =>{
        const loader = async () => {
        try {
            const tokenData = jwtDecode(localStorage.getItem('token'))
            if(tokenData.role === 'admin') {
            const response = await axios.get('http://localhost:4455/api/user/account', {
                headers: {
                'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            if(response.data.hasOwnProperty("id")) {
                const response1 = await axios.get('http://localhost:4455/api/user/company', {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
                })
                //console.log(response1.data)
                dispatch({type: "SET_DATA", payload:{user: response.data, company: response1.data, tokenData: tokenData}})
            }
            } else {
            const response = await axios.get(`http://localhost:4455/api/employee/${tokenData.id}`, {
                headers: {
                'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            if(response.data.hasOwnProperty("_id")) {
                const response1 = await axios.get('http://localhost:4455/api/user/company', {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
                })
                //console.log(response1.data)
                dispatch({type: "SET_DATA", payload:{employee: response.data, company: response1.data, tokenData: tokenData}})
            }
            }
        }catch(e) {
            alert(e.message)
        }
    }
        loader()
    },[dispatch])

    function getImageFileObject(imageFile) {
        console.log({ imageFile })
    }
    
    function runAfterImageDelete(file) {
        console.log({ file })
    }

    return (
        <section>
            {tokenData.role === "admin" ? <div className="container mt-1">
                <Card>
                    <Card.Header className="bg-dark bg-gradient" style={{background: "transparent"}}>
                        <div className="d-flex justify-content-center fs-2 fst-italic"> 
                            <ImageUploader style={{ height: 150, width: 150 }}
                                deleteIcon={<RiDeleteRow />}
                                uploadIcon={<BsCircle/>}
                                onFileAdded={(img) => getImageFileObject(img)}
                                onFileRemoved={(img) => runAfterImageDelete(img)}
                            />
                        </div>
                    </Card.Header>
                    <Card.Body className="bg-dark bg-gradient">
                        <Card.Title style={{color: "#FF7F50"}}>Profile</Card.Title><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>UserName</Col><Col> {user.username} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Email</Col><Col> {user.email} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Mobile</Col><Col> {user.mobile} </Col>
                        </Row>
                        <h5 className="mt-4" style={{color: "#FF7F50"}}> Company Details </h5><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>Company Name</Col><Col> {company.companyName} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Website</Col><Col> {company.companyWebsite} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Address</Col>
                            <Col> 
                              {`${company.companyAddress?.place} 
                               ${company.companyAddress?.city}
                               ${company.companyAddress?.state}-${company.companyAddress?.pincode}`}
                            </Col>
                        </Row>         
                    </Card.Body>
                </Card>
            </div> : null }
            {tokenData.role === "manager" ? <div className="container mt-1">
                <Card>
                    <Card.Header className="bg-dark bg-gradient" style={{background: "transparent"}}>
                        <div className="d-flex justify-content-center fs-2 fst-italic"> 
                            <ImageUploader style={{ height: 150, width: 150 }}
                                deleteIcon={<RiDeleteRow />}
                                uploadIcon={<BsCircle/>}
                                onFileAdded={(img) => getImageFileObject(img)}
                                onFileRemoved={(img) => runAfterImageDelete(img)}
                            />
                        </div>
                    </Card.Header>
                    <Card.Body className="bg-dark bg-gradient">
                        <Card.Title style={{color: "#FF7F50"}}>Profile</Card.Title><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>UserName</Col><Col> {employee.name} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Email</Col><Col> {employee.email} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Mobile</Col><Col> {employee.mobile} </Col>
                        </Row>
                        <h5 className="mt-4" style={{color: "#FF7F50"}}> Company Details </h5><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>Company Name</Col><Col> {company.companyName} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Website</Col><Col> {company.companyWebsite} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Address</Col>
                            <Col> 
                              {`${company.companyAddress?.place} 
                               ${company.companyAddress?.city}
                               ${company.companyAddress?.state}-${company.companyAddress?.pincode}`}
                            </Col>
                        </Row>         
                    </Card.Body>
                </Card>
            </div> : null }
            {tokenData.role === "fieldAgent" ? <div className="container mt-1">
                <Card>
                    <Card.Header className="bg-dark bg-gradient" style={{background: "transparent"}}>
                        <div className="d-flex justify-content-center fs-2 fst-italic"> 
                            <ImageUploader style={{ height: 150, width: 150 }}
                                deleteIcon={<RiDeleteRow />}
                                uploadIcon={<BsCircle/>}
                                onFileAdded={(img) => getImageFileObject(img)}
                                onFileRemoved={(img) => runAfterImageDelete(img)}
                            />
                        </div>
                    </Card.Header>
                    <Card.Body className="bg-dark bg-gradient">
                        <Card.Title style={{color: "#FF7F50"}}>Profile</Card.Title><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>UserName</Col><Col> {employee.name} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Email</Col><Col> {employee.email} </Col>
                        </Row>           
                        <Row className="mt-2 text-white">
                            <Col>Mobile</Col><Col> {employee.mobile} </Col>
                        </Row>
                        <h5 className="mt-4" style={{color: "#FF7F50"}}> Company Details </h5><hr style={{color: "#FDF8F8"}}/>
                        <Row className="mt-2 text-white">
                            <Col>Company Name</Col><Col> {company.companyName} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Website</Col><Col> {company.companyWebsite} </Col>
                        </Row>         
                        <Row className="mt-2 text-white">
                            <Col>Company Address</Col>
                            <Col> 
                              {`${company.companyAddress?.place} 
                               ${company.companyAddress?.city}
                               ${company.companyAddress?.state}-${company.companyAddress?.pincode}`}
                            </Col>
                        </Row>         
                    </Card.Body>
                </Card>
            </div> : null }
        </section>
    )
}

export default Profile

