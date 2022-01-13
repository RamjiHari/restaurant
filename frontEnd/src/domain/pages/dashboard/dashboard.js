import React,{useEffect, useState} from 'react';
import {BrowserRouter,BrowserRouter as Router,Switch,Route ,HashRouter} from  'react-router-dom';
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
import Checkout from '../checkout/checkout';
import Deliver from '../checkout/deliver';
import OrderItem from '../item/OrderItem';
import ListRestaurant from '../Restaurant/list';
import Restaurant from '../Restaurant/restaurant';
import ResItem from '../Restaurant/resItem';
import MaxOrder from '../item/maxOrder';

function Dashboard() {
  const [logged,setLogged] = useState(false);
  const [userData,setUserData]= useState("");

  const loggedSettings={
    isLogged:logged,
    userData:userData,
    setLogged,
    setUserData,
  };
console.log(`object`, logged)
  useEffect(() => {
    if(localStorage.getItem('res_user')!=undefined){
    setUserData(JSON.parse(localStorage.getItem('res_user')))
    setLogged(true)
    }else{
      setUserData('')
      setLogged(false)
    }
  }, [localStorage])
console.log(`loggedSettings`, loggedSettings)
  return (
 <Router>

  <LoginContext.Provider value={loggedSettings}>
     {logged ?
          <>
          <ToastContainer autoClose={4000}  />
            <NavHeader/>
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
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/buy/:id' component={Deliver} />
            <Route exact path='/orders' component={OrderItem} />
            <Route exact path='/addRestaurant' component={Restaurant} />
            <Route exact path='/restaurant' component={ListRestaurant} />
            <Route exact path='/editRestaurant/:id' component={Restaurant} />
            <Route exact path='/restaurant/:id' component={ResItem} />
            <Route exact path='/setting/maxOrder' component={MaxOrder} />

            <Footer/>
            </>:


       <>
       <ToastContainer autoClose={4000} />
            <NavHeader/>
            <ChatBox/>
            <Header/>
            <Sidebar/>
            <Route exact path='/' component={Home} />
            <Route exact path='/items/:id' component={ItemDetails} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/buy/:id' component={Deliver} />
            <Route exact path="/login" component={Login} />
            <Route  exact path="/superadmin" component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/restaurant/:id' component={ResItem} />
            <Footer/>
          </>
     }

     </LoginContext.Provider></Router>

  );
}

export default Dashboard;
