import { useState } from 'react'
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap'
import { categoryAdd } from '../redux/actions/CC-actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const CategoryForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

      const handleChange = (e) => {
        if(e.target.name === "name") {
          setName(e.target.value)
        } else if(e.target.name === "description") {
          setDescription(e.target.value)
        } 
      }

      const handleSubmit = (e) => {
        e.preventDefault();
          const formData = {
            name,
            description 
          }
          const resetForm = () => {
            setName('')
            setDescription('')
          }
          dispatch(categoryAdd(formData, resetForm)) 
          props.onHide()
          navigate("/clients-categories")
      }
     
  
    return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header className='bg-info bg-gradient' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
            <h4>Category Details</h4>
            <Form onSubmit={handleSubmit}>
                <FloatingLabel
                controlId="floatingName"
                label="Name"
                className="mb-2"
                >
                <Form.Control type="text" 
                    placeholder="enter category name" 
                    name="name" 
                    defaultValue={name} 
                    onChange={handleChange} 
                    required />
                </FloatingLabel>
            
                <FloatingLabel controlId="floatingDescription" label="Description">
                <Form.Control type="text" 
                    placeholder="enter your Description"
                    name="description"
                    defaultValue={description} 
                    onChange={handleChange}
                    required />
                </FloatingLabel>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <Button type="submit" variant="outline-primary" size="md" >Save</Button>
                    <Button variant="outline-secondary"  size="sm" onClick={props.onHide}>Close</Button>
                </div>    
            </Form>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>   
    )
}
export default CategoryForm

