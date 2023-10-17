import axios from "axios"
import { useContext, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Alert } from "../helpers/swal"
import { UserContext } from "../../App"
import "../../css/user.css"

const UpdateUser = () => {
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState(state.user?.username)
    const [email, setEmail] = useState(state.user?.email)
    const [mobile, setMobile] = useState(state.user?.mobile)


    const handleChange = (e) => {
        if(e.target.name === "username") {
            setUsername(e.target.value)
        } else if(e.target.name === "email") {
            setEmail(e.target.value)
        } else if(e.target.name === "mobile") {
            setMobile(e.target.value)
        }
    }

    const handleClick = () => {
        navigate('/account')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {username, mobile, email, password: state.user?.password, role: state.user?.role}
        const loader = async () => {
            try {
                const response = await axios.put("https://falt.onrender.com/api/user/update", formData, {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                if(response.data.hasOwnProperty("_id")) {
                    Alert("Successfully updated user details", "success", "account")
                    dispatch({type: "EDIT_USER", payload:response.data})
                } else {
                    Alert(response.data.error ? response.data.error : "something went wrong", "info", "update-user")
                }
            } catch(e) {
                Alert("e.message", "warning", "update-user")
            }
        }
        loader()
    }

    return (
        <section>
            
            <div className="user-box">
                <div>
                    <h4 className="text-center text-primary mb-3">Update Profile</h4>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingUsername" label="Username" className="mt-1" >
                            <Form.Control type="text" 
                                placeholder="enter your username"
                                name="username"
                                defaultValue={username} 
                                onChange={handleChange}
                                required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="Email" className="mt-1">
                            <Form.Control type="text" 
                                placeholder="enter your Email"
                                name="email"
                                defaultValue={email} 
                                onChange={handleChange}
                                required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingMobile" label="ConfirmMobile" className="mt-1">
                            <Form.Control type="text" 
                                placeholder="enter your mobile number"
                                name="mobile"
                                defaultValue={mobile} 
                                onChange={handleChange}
                                required />
                        </FloatingLabel>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="outline-info" style={{width:"120px", marginRight:"2px"}} onClick={handleClick}>Cancel</Button>{' '}
                            <Button variant="outline-info" type="submit" style={{width:"120px", marginLeft:"2px"}}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
} 

export default UpdateUser