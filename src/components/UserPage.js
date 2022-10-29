import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Dropdown, Image } from "react-bootstrap";
import MoreIcon from "../assets/more.svg";
import EditUser from "./EditUser";
function UserPage() {
  const [data, setData] = useState([{}]);
  let history = useHistory();
  let token = window.localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (el) => {
    setShow(true);
    setId(el.id);
  };
  const [id, setId] = useState();
  async function listOfUsers() {
    let headers = {
      accept: "text/plain",
      Authorization: `Bearer ${await token}`,
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

  function deleteUser(id) {
    let body = { id };
    let token = window.localStorage.getItem("token");
    let headers = {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json-patch+json",
    };
    axios
      .post(`https://pimb2bqaapi.pimalion.cloud/app/User/Delete`, body, {
        headers,
      })
      .then((response) => {
        listOfUsers();
        return;
      });
  }
  console.log(data);
  useEffect(() => {
    listOfUsers();
  }, []);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 && data !== undefined
          ? data.map((el) => (
              <tr>
                <td>{el.firstName}</td>
                <td>{el.email}</td>
                <td>
                  {el.roles !== undefined &&
                    el.roles.length > 0 &&
                    el.roles[0].name}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <Image src={MoreIcon} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={(el) => handleShow(el)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={(el) => deleteUser(el.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          : "Rip data"}
      </tbody>
      <EditUser handleClose={handleClose} show={show} id={id} />
    </Table>
  );
}

export default UserPage;
