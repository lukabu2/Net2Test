import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {
  Button,
  Collapse,
  Dropdown,
  DropdownButton,
  Image,
} from "react-bootstrap";
import MoreIcon from "../assets/more.svg";
import Divider from "../assets/divider.svg";
import Stefan from "../assets/stefan.svg";
import Settings from "../assets/settings.svg";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import "../css/Interface.css";
function UserPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([{}]);
  let history = useHistory();
  let token = window.localStorage.getItem("token");
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (el) => {
    setShow(true);
    setId(el.id);
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
  };
  let [id, setId] = useState();
  const [active, setActive] = useState(false);
  function listOfUsers() {
    let headers = {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
    };
    let body = {};
    axios
      .post("https://pimb2bqaapi.pimalion.cloud/app/User/List", body, {
        headers,
      })
      .then((response) => {
        setData(response.data.data.users);
        // console.log(response);
      });
  }

  function logoutUser() {
    let headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
    };
    let body = { userId: window.localStorage.getItem("userId") };
    axios
      .post("https://pimb2bqaapi.pimalion.cloud/app/Account/Logout", body, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function deleteUser(idOfUser) {
    if (idOfUser !== undefined) {
      let body = { id: idOfUser };
      let token = window.localStorage.getItem("token");
      let headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json-patch+json",
      };
      console.log("idOfUser", idOfUser);
      axios
        .post(`https://pimb2bqaapi.pimalion.cloud/app/User/Delete`, body, {
          headers,
        })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            listOfUsers();
            alert("Successfully deleted user!");
            return;
          }
        })
        .catch((err) => console.log(err));
    }
  }
  // console.log("dataa", data);
  useEffect(() => {
    listOfUsers();
  }, []);
  useEffect(() => {
    listOfUsers();
  }, [active === true]);

  return (
    <div className="d-flex bgColour">
      <div className="side-nav">
        <div className="px-2 py-2">
          <b className="logoBold text-light ml-2">LOGO</b>
          <hr className="text-light mt-5" />
        </div>
        <div>
          <div>
            <Button
              className="bg-transparent border-0 p-0"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <Image src={Settings} className="mx-2" /> Configurations
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text">
                {" "}
                <a
                  href="/users"
                  className="dropdownMargin text-light text-decoration-none"
                >
                  User
                </a>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <div>
        <div className="top-header h-20 text-primary" id="editTopPart">
          <div className="d-flex align-items-center py-3 justify-content-between mx-2">
            <b id="maincolor" className="textBold">
              Users{" "}
            </b>
            <div>
              {" "}
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  <div>
                    <Image className="mx-3 text-end" src={Divider} />
                    <Image src={Stefan} />
                  </div>
                }
              >
                <Dropdown.Item href="#" onClick={logoutUser}>
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div id="listWidth">
            <div className="d-flex justify-content-between align-items-center py-3">
              <div>
                <input placeholder="Search..." id="searchInput"></input>
              </div>
              <div>
                <Button
                  onClick={handleShow1}
                  id="addBtn"
                  className="border rounded-0 mx-4"
                >
                  Add User
                </Button>
              </div>
            </div>
            <div className="overflow-y-scroll custom-scroll-bar">
              <Table hover className="listEdit">
                <thead>
                  <tr>
                    <th className="thText">Name</th>
                    <th className="thText" width="314">
                      E-mail
                    </th>
                    <th className="thText" width="381">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 && data !== undefined
                    ? data.map((el) => (
                        <tr key={el.id}>
                          <td>{el.firstName}</td>
                          <td>{el.email}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-between">
                              {el.roles !== undefined &&
                                el.roles.length > 0 &&
                                el.roles[0].name}
                              <div>
                                <Dropdown>
                                  <Dropdown.Toggle>
                                    <Image src={MoreIcon} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => handleShow(el)}
                                    >
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => {
                                        deleteUser(el.id);
                                      }}
                                    >
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    : "Rip data"}
                </tbody>
                <EditUser
                  handleClose={handleClose}
                  show={show}
                  id={id}
                  token={token}
                  key={id}
                />
                <AddUser
                  handleClose={handleClose1}
                  show={show1}
                  token={token}
                  setActive={setActive}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
