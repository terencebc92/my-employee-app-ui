import React, { useState } from 'react'
import './User.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Toast, ToastContainer } from "react-bootstrap";
import { employeesUrl } from '../../config/config';

const CreateUser = () => {
    const [showToast, setShowToast] = useState(false);
    const [employee, setEmployee] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: name === 'salary' ? parseInt(value) : value
        }))
      };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(employee)
        try {
            const response = await fetch(employeesUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                setShowToast(true);
                console.log('Form submitted successfully!');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            console.log(error.message);
        } finally{
            console.log("Done");
        }
    }

    return (
        <div>
        <ToastContainer position="middle-center">        
            <Toast bg='primary' show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className={'text-white'}>Employee created successfully!</Toast.Body>
        </Toast></ToastContainer>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={employee.firstName} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={employee.lastName} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Email" name="email" value={employee.email} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Salary</Form.Label>
        <Form.Control type="number" placeholder="Salary" name="salary" value={employee.salary} onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    )
}

export default CreateUser