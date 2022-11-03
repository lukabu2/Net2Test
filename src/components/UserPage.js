import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Button, Dropdown, Image } from "react-bootstrap";
import MoreIcon from "../assets/more.svg";
import EditUser from "./EditUser";
import AddUser from "./AddUser";

function UserPage() {
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
      // axios
      //   .post(`https://pimb2bqaapi.pimalion.cloud/app/User/Delete`, body, {
      //     headers,
      //   })
      //   .then((response) => {
      //     listOfUsers();
      //     return;
      //   });
    }
  }
  // console.log("dataa", data);
  useEffect(() => {
    listOfUsers();
  }, []);

  return (
    <div>
      <Button onClick={handleShow1}>Add User</Button>
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
                <tr key={el.id}>
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
                          onClick={() => handleShow(el)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          // jes jer ga prosledjujemo od gornje funk
                          onClick={() => {
                            deleteUser(el.id);
                          }}
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
        <EditUser
          handleClose={handleClose}
          show={show}
          id={id}
          token={token}
          key={id}
        />
        <AddUser handleClose={handleClose1} show={show1} token={token} />
      </Table>
    </div>
  );
}

export default UserPage;
