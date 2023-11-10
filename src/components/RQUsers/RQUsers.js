import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  useAddUserData,
  useDeleteUser,
  useEditUser,
  useUsersData,
} from "../../hooks/useUsersData";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomTable } from "../CustomUIComponents/CustomTable";
import { useUserInterestById } from "../../hooks/useUserDataById";
import { CustomModal } from "../CustomUIComponents/CustomModal";

const initialState = {
  id: "",
  name: "",
  age: "",
};
export const RQUsers = () => {
  const [userId, setUserId] = useState("");
  const [userForm, setUserForm] = useState(initialState);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  /* #region  success and error callbacks for Users */
  const onSuccessUser = (data) => {
    console.log("success", data);
  };

  const onErrorUser = (error) => {
    console.log("error", error);
  };
  /* #endregion */

  // Get Users
  // refetch is used to fetch data on click of button
  const { isLoading, isFetching, data, isError, error, refetch } = useUsersData(
    onSuccessUser,
    onErrorUser
  );

  const { data: interests } = useUserInterestById(userId);
  console.log("interests", interests);

  // Add User
  const { mutate: addUserToList } = useAddUserData();

  // Delete user
  const { mutate: deleteUserFromList } = useDeleteUser();

  //Edit user
  const { mutate: editUserFromList } = useEditUser();

  const deleteUser = (userId) => {
    deleteUserFromList(userId);
  };
  const getUserInterest = (userId) => {
    setUserId(userId);
  };

  const editUser = (user) => {
    setShowEditModal(true);
    setUserForm({
      id: user.id,
      name: user.name,
      age: user.age,
    });
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const addUser = () => {
    console.log("userForm", userForm);
    setShowEditModal(true);
  };

  const handleSave = () => {
    console.log("EditUser", userForm);
    if (userForm.id) {
      editUserFromList(userForm);
    } else {
      addUserToList(userForm);
    }

    handleClose();
  };

  const getUsers = (data) => {
    const headers = ["Name", "Age", "Action", "Action", "Likes"];
    const columns = data?.data.map((user) => {
      return (
        <tr key={user.id}>
          <th>
            <Link to={`${user.id}`}>{user.name}</Link>
          </th>
          <th>
            <span className="px-3">{user.age}</span>
          </th>
          <th>
            <Button size="sm" onClick={() => editUser(user)}>
              Edit
            </Button>
            <Button
              size="sm"
              className="mx-2"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </Button>
          </th>
          <th>
            <Button size="sm" onClick={() => getUserInterest(user.id)}>
              Get Interests
            </Button>
          </th>
          <th
            className={`${
              user.id == interests?.data.id ? "d-block" : "d-none"
            }`}
          >
            {interests?.data.likes.join(",")}
          </th>
        </tr>
      );
    });

    return <CustomTable headers={headers} columns={columns} />;
  };

  return (
    <div className="py-3">
      <div className="pt-4 d-flex justify-content-around align-items-center">
        <div>
          <h3>Users</h3>
        </div>
        <div>
          <Link className="px-4" to={"rqusersDetails"}>
            Get all Users Details
          </Link>
          <Button size="sm" onClick={addUser}>
            Add User
          </Button>
        </div>
      </div>

      {(isLoading || isFetching) && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isError && <h2>{error.message}</h2>}
      {getUsers(data)}

      {/* only names extracted from select */}
      {/* {data?.map((userName) => {
        return (
          <div key={userName}>
            <span>{userName}</span>
          </div>
        );
      })} */}

      {/* <Button size="sm" onClick={refetch}>Fetch Users</Button> */}

      <CustomModal
        handleSave={handleSave}
        show={showEditModal}
        handleClose={handleClose}
      >
        <Form className="d-flex justify-content-center">
          <Row className="align-items-center">
            <Col>
              <Form.Control
                value={userForm?.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="name"
              />
            </Col>

            <Col>
              <Form.Control
                value={userForm?.age}
                onChange={handleChange}
                name="age"
                type="number"
                placeholder="age"
              />
            </Col>
          </Row>
        </Form>
      </CustomModal>
    </div>
  );
};
