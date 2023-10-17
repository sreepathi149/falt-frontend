import { Link, useNavigate } from "react-router-dom"
import {Navbar, Container, Nav, NavDropdown, Button} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import { useContext } from "react"
import { UserContext } from "../../App"
import logo from '../../images/nav/logo.jpg'

const NavBar = () => {
  const {state} = useContext(UserContext)
  const navigate = useNavigate()
  const user = state.user
  const employee = state.employee
  const tokenData = state.tokenData

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isVerified')
    navigate("/login")
  }


  return (
    <div>
        <Container fluid>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/"><img src={logo} width="40" height="40" alt=""  /> {' '} Falt</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" defaultActiveKey="/" className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {localStorage.getItem('token') && localStorage.getItem('isVerified') ? <Nav.Link as={Link} to="/employees">Employees</Nav.Link> : null}
              {localStorage.getItem('token') && localStorage.getItem('isVerified') ? null : <Nav.Link as={Link} to="/contact">Contact</Nav.Link>}
              <NavDropdown title="Features" id="dropdown-menu-align-responive-1" align={{lg: "end"}} >
                {localStorage.getItem('token') && localStorage.getItem('isVerified') ? <NavDropdown.Item as={Link} to="/clients-categories">Clients & Categories</NavDropdown.Item> : null}
                <NavDropdown.Item as={Link} to="/location-tracking">Location tracking</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/task-management">Task Management</NavDropdown.Item>
              </NavDropdown>
              {localStorage.getItem('token') && localStorage.getItem('isVerified') ? null : <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>}
              {localStorage.getItem('token') && localStorage.getItem('isVerified') ? null : <Nav.Link as={Link} to="/free-trail">Free-Trail</Nav.Link>}
              {localStorage.getItem('token') && localStorage.getItem('isVerified') ? 
              <NavDropdown title={<CgProfile style={{height: "30px", width:"30px"}}/>} id="dropdown-menu-align-responive-1" align={{lg: "end"}}>
                <p>User: {tokenData.role === "admin" ? user.username : employee.name }</p>
                <p>Email: {tokenData.role === "admin" ? user.email : employee.email }</p>
                <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/field-uploads">Uploads</NavDropdown.Item>
                <hr/>
                <Button variant="outline-info" onClick={handleClick} style={{border: "none", background: "none", width: "80px", height: "35px", marginLeft: "0"}}>Logout</Button>
              </NavDropdown>
               : <Nav.Link as={Link} to="/login">Login <FaUser /></Nav.Link>}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
        </Container>
    </div>
    
  )
    
}

export default NavBar