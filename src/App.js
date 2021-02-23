import logo from "./logo.svg";
import "./App.css";
import Login from "./login/Login";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import useIsLoggedIn from './login/useIsLoggedIn';
import PersistentDrawerLeft from './navigation/PersistentDrawerLeft'
import SimpleCard from './card/SimpleCard'


function App() {
  // const LoginView = () => <Login success={loginSuccess} failed={loginFailed} />;
  const prueba = {
    "description": "some description text ",
    "responsible": {
        "name": "Santiago Carrillo",
        "email": "sancarbar@gmail"
    },
    "status": "ready",
    "dueDate": 156464645646
  };
  const TodoAppView = () => <SimpleCard prueba={prueba}/>;

  const router = () => (
    <Router>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/todo" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Switch>
        <Route path="/todo">
          {TodoAppView}
        </Route>
        </Switch>
      </Router>
  );

  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  if(!isLoggedIn) {
    console.log("F");
    return <Login setIsLoggedIn={setIsLoggedIn} />
  }
  
  return (
    <div className="wrapper">
      <PersistentDrawerLeft prueba={router}/>
      
    </div>
  );
}

export default App;
