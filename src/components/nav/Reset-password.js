import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import '../../css/reset-password.css'

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name === 'oldPassword'){
            setOldPassword(e.target.value)
        } else if(e.target.name === 'newPassword') {
            setNewPassword(e.target.value)
        } else if(e.target.name === 'confirmNewPassword') {
            setConfirmNewPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newPassword,"21")
        const data = {
            oldPassword, newPassword
        }
        if(newPassword === confirmNewPassword) {
            const loader = async () => {
                try{
                    const response = await axios.put('http://localhost:4455/api/user/reset-password', data, {
                        headers: {
                            'authorization' : localStorage.getItem('token')
                        }
                    })
                    console.log(response.data) 
                    alert('successfully updated Password')
                    navigate('/account')  
                } catch(e) {
                    alert(e.message)
                }
            }
            loader()
        } else {
            console.log("passwords not matched")
        }
    }

    const handleClick = () => {
        navigate("/account")
    }

    return (
        <div className="reset-box">
            <div>
                <h4 className="text-center text-success">Reset Password</h4>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingOldPassword" label="OldPassword" className="mt-1" >
                        <Form.Control type="text" 
                            placeholder="enter your Old Password"
                            name="oldPassword"
                            defaultValue={oldPassword} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingNewPassword" label="NewPassword" className="mt-1">
                        <Form.Control type="text" 
                            placeholder="enter your new Password"
                            name="newPassword"
                            defaultValue={newPassword} 
                            onChange={handleChange}
                            required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingConfirmNewPassword" label="ConfirmNewPassword" className="mt-1">
                        <Form.Control type="text" 
                            placeholder="enter your confirm NewPassword"
                            name="confirmNewPassword"
                            defaultValue={confirmNewPassword} 
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
    )
}

export default ResetPassword