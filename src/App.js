import logo from "./logo.svg";
import "./App.css";
import Login from "./login/Login";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import useIsLoggedIn from './login/useIsLoggedIn';
import PersistentDrawerLeft from './navigation/PersistentDrawerLeft'
import SimpleCard from './card/SimpleCard'
import SignUp from './singup/SignUp';
import TaskForm from './task-form/TaskForm';
import useListTask from './useListTask';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function App() {
  // const LoginView = () => <Login success={loginSuccess} failed={loginFailed} />;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(6),
    }
  }));
  const { listTask, setListTask } = useListTask([]);
  const classes = useStyles();
  console.log(listTask, "$$$$$$$$$")
  const TodoAppView = () => (
    <div> 
      {listTask.map((task, index) => <div key={index}><SimpleCard  prueba={task} /><br /></div>)}
      <Fab color="primary" aria-label="add" className={classes.fab} href="/newtask">
        <AddIcon />
      </Fab>
    </div>
  );
 

  const router = () => (
    <Router>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/todo" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </Route>
      <Switch>
        <Route path="/todo">
          {TodoAppView}
        </Route>
        <Route path="/newtask" >
          <TaskForm setListTask={setListTask}/>
        </Route>
      </Switch>
    </Router>
  );

  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
    <Router>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/todo" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      </Route>
      <Route path="/singup">
        <SignUp />
      </Route>
      <Switch>
        <Route path="/todo">
        {!isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
        <Route path="/newtask">
        {!isLoggedIn ? <Redirect to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        </Route>
      </Switch>
    </Router> 
    )
  }

  return (
    <div className="wrapper">
      <PersistentDrawerLeft prueba={router} />

    </div>
  );
}

export default App;
