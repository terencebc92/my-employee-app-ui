import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Toast,
  ToastContainer,
  Button as BootStrapButton,
} from "react-bootstrap";
import { employeesUrl } from "../../config/config";
import {
  Tooltip,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";

const MainTable = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [updatedEmployeeId, setUpdatedEmployeeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [error, setError] = useState(null);
  const isEditing = (employee) => employee.id === editingKey;

  const edit = (employee) => {
    form.setFieldsValue({
      ...employee,
    });
    setEditingKey(employee.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: true,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      editable: true,
      sorter: (a, b) => a.salary - b.salary,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, employee) => {
        const editable = isEditing(employee);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(employee.id)}>
              <BootStrapButton variant="primary" size="sm" className="m-1">
                Save{" "}
              </BootStrapButton>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <BootStrapButton variant="warning" size="sm" className="m-1">
                <a>Cancel</a>
              </BootStrapButton>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(employee)}
            >
              <Tooltip
                title="Update employee details"
                color={"cyan"}
                key={"cyan"}
              >
                <BootStrapButton variant="secondary" size="sm" className="mx-1">
                  Edit
                </BootStrapButton>
              </Tooltip>
            </Typography.Link>
            <Popconfirm
              title={
                `Are you sure you want to delete employee id: ` +
                employee.id +
                "?"
              }
              okText="DELETE"
              onConfirm={() => handleDelete(employee.id)}
            >
              <Typography.Link>
                <BootStrapButton variant="danger" size="sm" className="mx-1">
                  Delete
                </BootStrapButton>
              </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`${employeesUrl}/${employee.id}`, employee)
  //     .then((response) => {
  //       console.log(response.data);
  //       setShowToast(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error.response.data);
  //     });
  // };

  const save = async (id) => {
    try {
      const employee = await form.validateFields();
      console.log(employee);
      console.log(id);

      axios
        .put(`${employeesUrl}/${id}`, employee)
        .then((response) => {
          console.log(response.data);
          setShowUpdateToast(true);
          setUpdatedEmployeeId(id);

          const newUsers = [...users];
          console.log(newUsers);
          const index = newUsers.findIndex((item) => id === item.id);
          if (index > -1) {
            const item = newUsers[index];
            newUsers.splice(index, 1, {
              ...item,
              ...employee,
            });
            setUsers(newUsers);
            setEditingKey("");
          } else {
            newUsers.push(employee);
            setUsers(newUsers);
            setEditingKey("");
          }
        })
        .catch((error) => {
          console.error(error);
          setError(error.response.data);
        });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

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
        console.log("Checking error");
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          // Handle 503 error
          setError(
            "Looks like the backend failed to boot due to the DB instance exceeding free-tier limits."
          );
          console.error("Service unavailable");
        }
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
        const newData = users.filter((user) => user.id !== id);
        setUsers(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

          <ToastContainer position="middle-center">
            <Toast
              bg="success"
              show={showUpdateToast}
              onClose={() => setShowUpdateToast(false)}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Updated successfully!</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>
                Changes recorded for employee id: {updatedEmployeeId}
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

          <ToastContainer position="middle-center">
            <Toast
              bg="info"
              show={error}
              onClose={() => setError(null)}
              delay={15000}
              autohide="false"
            >
              <Toast.Header>
                <strong className="me-auto">Backend failed to load</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>{error}</Toast.Body>
            </Toast>
          </ToastContainer>

          <Form form={form} component={false}>
            <Table
              pagination={{
                onChange: cancel,
              }}
              bordered
              rowClassName="editable-row"
              dataSource={users}
              columns={mergedColumns}
              size="small"
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default MainTable;
