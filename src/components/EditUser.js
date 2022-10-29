import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
function EditUser({ show, handleClose, id }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <label>Name</label>
            <Form.Control type="text" name="name" placeholder="Enter name..." />
          </Col>
          <Col lg={6}>
            <label>Last Name</label>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Enter last name..."
            />
          </Col>
          <Col lg={12}>
            <label>E-mail</label>
            <Form.Control
              type="email"
              name="surname"
              placeholder="Enter email..."
            />
          </Col>
          <Col lg={12}>
            <label>Username</label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter usename..."
            />
          </Col>
          <Col lg={12}>
            <label>Password</label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password..."
            />
          </Col>
          <Col lg={12}>
            <label>Role</label>
            <Form.Select aria-label="role">
              <option>role</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUser;
