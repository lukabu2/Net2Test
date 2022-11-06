import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../css/Interface.css";
function AddUser({ show, handleClose, token, setActive }) {
  function addUser() {
    let body = {
      user: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        userName: document.getElementById("userName").value,
        active: true,
        apiAccessAllowed: false,
        roles: [{ name: document.getElementById("role").value }],
        labels: [
          { id: "6139c2ce86485142185d6e31", name: "Audi", damBadgeColor: null },
          {
            id: "5fcf87651c32f90ce8dbcfb9",
            name: "Balitrand",
            damBadgeColor: null,
          },
        ],
        password: document.getElementById("password").value,
        departmentId: "5cc7790c4f3a516c41c493d0",
        notify: true,
        language: { id: "5ca493960d7cac452d10c22d", name: "en-GB" },
        enabled: true,
        tokenExpiration: 0,
      },
    };
    let headers = {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
    };
    axios
      .post("https://pimb2bqaapi.pimalion.cloud/app/User/Create", body, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setActive(true);
          alert("Sucessfully added user.");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <div className="text-bold-700-modal-title text-navy">Add User</div>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6} className="pl-2">
            <label className="text-color-muted">Name</label>
            <Form.Control
              type="text"
              name="firstName"
              className="input-fields"
              id="firstName"
              placeholder="Enter first name..."
            />
          </Col>
          <Col lg={6} className="pr-0">
            <label className="text-color-muted">Last Name</label>
            <Form.Control
              type="text"
              name="lastName"
              className="input-fields"
              id="lastName"
              placeholder="Enter last name..."
            />
          </Col>
          <Col lg={12} className="mt-3">
            <label className="text-color-muted">E-mail</label>
            <Form.Control
              type="email"
              name="email"
              className="input-fields"
              id="email"
              placeholder="Enter email..."
            />
          </Col>
          <Col lg={12} className="mt-3">
            <label className="text-color-muted">Username</label>
            <Form.Control
              type="text"
              name="username"
              className="input-fields"
              id="userName"
              placeholder="Enter usename..."
            />
          </Col>
          <Col lg={12} className="mt-3">
            <label className="text-color-muted">Password</label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              className="input-fields"
              placeholder="Enter password..."
            />
          </Col>
          <Col lg={12} className="mt-3">
            <label className="text-color-muted">Role</label>
            <Form.Select
              aria-label="role"
              name="role"
              id="role"
              className="input-fields"
            >
              <option value={"Super Admin"} name="name">
                Super Admin
              </option>
              <option value={"Admin"} name="name">
                Admin
              </option>
              <option value={" User"} name="name">
                User
              </option>
            </Form.Select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addUser} className="small-button">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser;
