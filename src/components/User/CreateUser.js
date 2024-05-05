import React, { useState } from "react";
import "./User.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row, Toast, ToastContainer, Container } from "react-bootstrap";
import { employeesUrl } from "../../config/config";
import axios from "axios";

const CreateUser = () => {
  const [showToast, setShowToast] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [responseData, setResponseData] = useState();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: name === "salary" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
    axios
      .post(`${employeesUrl}`, employee)
      .then((response) => {
        setShowToast(true);
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data);
      });
  };

  return (
    <Container className="pt-4">
      <h4 style={{ paddingBlock: "20px" }}>Create New Employee</h4>
      <Row>
        <Col />
        <Col xs={6}>
          <ToastContainer position="middle-center">
            <Toast
              bg="primary"
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">New comployee created!</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>
                Employee created with id: {responseData}
              </Toast.Body>
            </Toast>
          </ToastContainer>

          <ToastContainer position="middle-center">
            <Toast
              bg="danger"
              show={error}
              onClose={() => setError(null)}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Error on submission!</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>{error}</Toast.Body>
            </Toast>
          </ToastContainer>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
                aria-label="Form field to enter first name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                aria-label="Form field to enter last name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                aria-label="Form field to enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Salary"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                aria-label="Form field to enter salary"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              aria-label="Button to create user"
              role="button"
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default CreateUser;
