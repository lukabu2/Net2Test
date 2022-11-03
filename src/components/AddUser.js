import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function AddUser({ show, handleClose, token }) {
  const [data, setData] = useState({});
  let {
    firstName,
    lastName,
    email,
    userName,
    active,
    apiAccessAllowed,
    roles,
    labels,
    userPreferences,
    password,
    departmentId,
    notify,
    language,
    enabled,
    tokenExpiration,
  } = data !== null ? data : "";

  function addUser() {
    let body = {
      user: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        userName: document.getElementById("userName").value,
        active: active,
        apiAccessAllowed: apiAccessAllowed,
        roles: roles,
        labels: labels,
        password: document.getElementById("password").value,
        departmentId: departmentId,
        notify: true,
        language: language,
        enabled: enabled,
        tokenExpiration: tokenExpiration,
      },
    };
    let headers = {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
    };
    axios
      .post("https://pimb2bqaapi.pimalion.cloud/app/User/Update", body, {
        headers,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
  if (data !== null) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6}>
              <label>Name</label>
              <Form.Control type="text" name="firstName" id="firstName" />
            </Col>
            <Col lg={6}>
              <label>Last Name</label>
              <Form.Control
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name..."
              />
            </Col>
            <Col lg={12}>
              <label>E-mail</label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Enter email..."
              />
            </Col>
            <Col lg={12}>
              <label>Username</label>
              <Form.Control
                type="text"
                name="username"
                id="userName"
                placeholder="Enter usename..."
              />
            </Col>
            <Col lg={12}>
              <label>Password</label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password..."
              />
            </Col>
            <Col lg={12}>
              <label>Role</label>
              <Form.Select
                aria-label="role"
                name="role"
                id="role"
                //
              >
                <option value={1} name="name">
                  Admin
                </option>
              </Form.Select>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return "...";
  }
}

export default AddUser;
