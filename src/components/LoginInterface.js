import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/Interface.css";
function LoginInterface() {
  let history = useHistory();
  async function registerFun(body) {
    let headers = {
      accept: "text/plain",
      "Content-Type": "application/json-patch+json",
    };
    axios
      .post("https://pimb2bqaapi.pimalion.cloud/app/Account/Login", body, {
        headers,
      })
      .then(async (response) => {
        console.log(response.status);
        if (response.status === 200) {
          // console.log(response.data.data);
          window.localStorage.setItem(
            "token",
            await response.data.data.tokenResponse.token
          );
          window.localStorage.setItem(
            "userId",
            await response.data.data.tokenResponse.user.id
          );
          history.push("users");
        }
      });
  }
  function submit(e) {
    e.preventDefault();
    let usernameW = document.querySelector("#emailId").value;
    let passwordW = document.querySelector("#passwordId").value;
    let body = { username: usernameW, password: passwordW };
    registerFun(body);
  }

  return (
    <div>
      <div className="centerItem" id="backgroundCol">
        <form id="formWidth">
          <p className="centerContent">
            <b id="largeFont">Welcome back</b>
          </p>
          <p className="centerContent" id="smallFont">
            Please enter your login info
          </p>
          <div className="centerContent">
            <input
              className="borderRad"
              type="email"
              placeholder="E-mail"
              id="emailId"
            ></input>
          </div>
          <div className="centerContent">
            <input
              className="borderRad"
              type="password"
              placeholder="Password"
              id="passwordId"
            ></input>
          </div>
          <div className="centerContent">
            <button id="buttonEdit" onClick={submit}>
              <b>Sign in</b>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginInterface;
