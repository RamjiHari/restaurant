import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from  'react-router-dom';
import Main from '../../includes/main';
import Login from '../login/login';
import Register from '../register/register';


function Dashboard() {
  const [login, setlogin] = useState(localStorage.getItem('res_user')!=undefined ? true:false)
console.log(`object`, login)
  return (
    <div className="wrapper">

        {login?
          <Router>
          <Route exact path='/home' component={Main} />

</Router>:
<Router>
<Route exact path='/login' component={Login} />
<Route exact path='/register' component={Register} />
</Router>
        }
    </div>
  );
}

export default Dashboard;
