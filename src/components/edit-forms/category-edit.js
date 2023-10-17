import { useState } from 'react'
import {Button, FloatingLabel, Form, Modal} from 'react-bootstrap'
import {categoryEdit } from '../redux/actions/CC-actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const CategoryEditForm = (props) => {
    const {category} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = category._id
    const [name, setName] = useState("")
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
        const formData = {id, name, description}
        dispatch(categoryEdit(formData)) 
        props.onHide()
        navigate("/clients-categories")
    }
     
  
    return (
            <Modal
                {...props}
                size="md"
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header className='bg-info bg-gradient' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Update Category
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
                    defaultValue={category.name} 
                    onChange={handleChange} 
                    />
                </FloatingLabel>
            
                <FloatingLabel controlId="floatingDescription" label="Description">
                <Form.Control type="text" 
                    placeholder="enter your Description"
                    name="description"
                    defaultValue={category.description} 
                    onChange={handleChange}
                    />
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
export default CategoryEditForm

