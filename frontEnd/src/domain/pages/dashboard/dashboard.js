import React,{useState} from 'react';
import {BrowserRouter,BrowserRouter as Router,Switch,Route} from  'react-router-dom';
import Main from '../../includes/main';
import Login from '../login/login';
import Register from '../register/register';
import { createBrowserHistory } from "history"
import LoginContext from '../context/LoginContext';
import Header from '../../includes/header';
import NavHeader from '../../includes/navHeader';
import ChatBox from '../../includes/chatBox';
import Sidebar from '../../includes/sidebar';
import Home from '../home/Home';
import Footer from '../../includes/footer';

function Dashboard() {
  const [login, setlogin] = useState(false)

  const [logged,setLogged] = useState(true);
  const [userData,setUserData]= useState("");

  const loggedSettings={
    isLogged:logged,
    userData:userData,
    setLogged,
    setUserData,
  };
console.log(logged,"logged")
  return (
 <Router>
  <LoginContext.Provider value={loggedSettings}>
     {logged ?


      <Route exact path='/' component={Main} />:


       <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
     }</LoginContext.Provider></Router>

  );
}

export default Dashboard;
