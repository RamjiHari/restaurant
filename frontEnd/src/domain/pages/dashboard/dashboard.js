import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from  'react-router-dom';
import Main from '../../includes/main';
import Login from '../login/login';
import Register from '../register/register';


function Dashboard() {
  const [login, setlogin] = useState(true)
  return (
    <div className="wrapper">
        <Router>
<Route exact path='/home' component={Main} />
<Route exact path='/login' component={Login} />
<Route exact path='/register' component={Register} />
</Router>


    </div>
  );
}

export default Dashboard;
