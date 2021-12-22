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
import Home from '../home/home';
import Footer from '../../includes/footer';
import Menu from '../menu/Menu';
import Item from '../item/Item';
import AddItem from '../item/AddItem';

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
          <>
            <NavHeader/>
            <Footer/>
            <ChatBox/>
            <Header/>
            <Sidebar/>
            <Route exact path='/' component={Home} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/item' component={Item} />
            <Route exact path='/additem' component={AddItem} />
            <Route exact path='/edititem/:id' component={AddItem} />
            <Footer/>
            </>:


       <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
     }

     </LoginContext.Provider></Router>

  );
}

export default Dashboard;
