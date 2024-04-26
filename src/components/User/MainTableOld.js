import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast, ToastContainer, Button } from "react-bootstrap";
import { employeesUrl } from "../../config/config";

const MainTable = () => {
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(employeesUrl)
      .then((res) => {
        console.log("Fetching data");
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false on error
      });
  };

  const handleDelete = (id) => {
    console.log("id : -", id);
    axios
      .delete(`${employeesUrl}/${id}`)
      .then((response) => {
        console.log(response.data);
        setShowToast(true);
        setEmployeeId(id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleDelete = async (id) => {
  //   console.log("id : -", id);
  //   try {
  //     const response = await fetch(employeesUrl.concat("/") + id, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete item");
  //     }
  //     setShowToast(true);
  //     setUsers(users.filter((item) => item.id !== id));
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     console.log("Finished");
  //   }
  // };

  return (
    <div className="container pt-4">
      {loading ? (
        <>
          <div className="alert alert-info">
            <h5>
              As I'm on Azure's free tier, please wait for the backend to start
              up
            </h5>
            <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <div>
          <ToastContainer position="middle-center">
            <Toast
              bg="primary"
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Delete success</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>
                Employee of id: {employeeId} has been deleted!
              </Toast.Body>
            </Toast>
          </ToastContainer>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((employee, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.salary}</td>
                    <td>
                      <Link to={`/edit-user/${employee.id}`}>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>{" "}
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MainTable;
