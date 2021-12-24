import React,{useEffect, useState} from 'react';
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
import ItemDetails from '../item/ItemDetails';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from '../cart/cart';
function Dashboard() {
  const [login, setlogin] = useState(false)

  const [logged,setLogged] = useState(localStorage.getItem("res_user")
  ? true
  : false);
  const [userData,setUserData]= useState("");
console.log(`logged`, logged)
  const loggedSettings={
    isLogged:logged,
    userData:userData,
    setLogged,
    setUserData,
  };

  useEffect(() => {
    setUserData(localStorage.getItem('res_user'))
  }, [])

  return (
 <Router>

  <LoginContext.Provider value={loggedSettings}>
     {logged ?
          <>
          <ToastContainer />
            <NavHeader/>
            <Footer/>
            <ChatBox/>
            <Header/>
            <Sidebar/>
            <Route exact path='/' component={Home} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/item' component={Item} />
            <Route exact path='/additem' component={AddItem} />
            <Route exact path='/items/:id' component={ItemDetails} />
            <Route exact path='/edititem/:id' component={AddItem} />
            <Route exact path='/cart' component={Cart} />

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
