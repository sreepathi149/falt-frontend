import { useContext, useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import EmployeeEditForm from "../edit-forms/employee-edit"

const Settings = (props) => {
    const {tokenData} = props
    const {state} = useContext(UserContext)
    const [employeeEditShow, setEmployeeEditShow] = useState(false)
    const [editObj, setEditObj] = useState('')
    const user = state.employee

    const handleEmployeeEdit = (obj) => {
        setEditObj(obj)
        setEmployeeEditShow(true)
    }

    return (
        <section>
            <div>
                <EmployeeEditForm
                    employee={editObj}
                    show={employeeEditShow}
                    onHide={() => setEmployeeEditShow(false)}
                />
            </div>
            <div className="container mt-1">
                <Row className="container mt-2">
                    <Col className="ms-auto">
                        ResetPassword
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-secondary" style={{width: "200px"}} as={Link} to="/reset-password">Reset Password</Button>
                    </Col>
                </Row>
                <Row className="container mt-2">
                    <Col className="ms-auto">
                        UpdateProfile
                    </Col>
                    <Col xs="auto">
                        {tokenData.role === "admin" ?
                        <Button variant="outline-secondary" style={{width: "200px"}} as={Link} to="/update-user">Update Profile</Button> 
                        :
                        <Button variant="outline-secondary" style={{width: "200px"}} onClick={() => {handleEmployeeEdit(user)}}>Update Employee</Button> 
                        }
                    </Col>
                </Row>
                <Row className="container mt-2">
                    <Col className="ms-auto">
                        updateCompanyDetails
                    </Col>
                    <Col xs="auto">
                        {tokenData.role === "admin" && <Button variant="outline-secondary" style={{width: "200px"}} as={Link} to="/update-company">Update Company</Button>}
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default Settings