import React from "react";
import "./css/App.css";
import LoginInterface from "./components/LoginInterface";
import UserPage from "./components/UserPage";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LoginInterface />
      </Route>
      <Route exact path="/users">
        <UserPage />
      </Route>
    </Switch>
  );
}

export default App;
