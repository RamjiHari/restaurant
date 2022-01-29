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
import addCategory from '../item/addCategory';
import Category from '../item/category';
import AddCategory from '../item/addCategory';
import AddCampaignType from '../item/addCampaignType';
import CampaignType from '../item/campaignType';
import AddCampaign from '../item/addCampaign';
import Campaign from '../item/campaign';
import Stripe from '../checkout/StripeContainer';
import StripeContainer from '../checkout/StripeContainer';
import PaymentForm from '../checkout/PaymentForm';
import Payment from '../checkout/Payment';
import Success from '../checkout/Success';
import ViewOrder from '../item/ViewOrder';

function Dashboard() {
  const [logged,setLogged] = useState(false);
  const [userData,setUserData]= useState("");

  const loggedSettings={
    isLogged:logged,
    userData:userData,
    setLogged,
    setUserData,
  };
  useEffect(() => {
    if(localStorage.getItem('res_user')!=undefined){
    setUserData(JSON.parse(localStorage.getItem('res_user')))
    setLogged(true)
    }else{
      setUserData('')
      setLogged(false)
    }
  }, [localStorage])

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
            {/* <Route exact path='/buy/:id' component={Deliver} /> */}
            <Route exact path='/orders' component={OrderItem} />
            <Route exact path='/orders/:id' component={ViewOrder} />
            <Route exact path='/addRestaurant' component={Restaurant} />
            <Route exact path='/restaurant' component={ListRestaurant} />
            <Route exact path='/editRestaurant/:id' component={Restaurant} />
            <Route exact path='/restaurant/:id' component={ResItem} />
            <Route exact path='/setting/maxOrder' component={MaxOrder} />
            <Route exact path='/addCategory' component={AddCategory} />
            <Route exact path='/category' component={Category} />
            <Route exact path='/editCategory/:id' component={AddCategory} />
            <Route exact path='/addCampaignType' component={AddCampaignType} />
            <Route exact path='/campaignType' component={CampaignType} />
            <Route exact path='/editCampaignType/:id' component={AddCampaignType} />
            <Route exact path='/addCampaign' component={AddCampaign} />
            <Route exact path='/campaign' component={Campaign} />
            <Route exact path='/editCampaign/:id' component={AddCampaign} />
            <Route exact path='/buy/:id' component={Payment} />
            <Route exact path='/success' component={Success} />
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
