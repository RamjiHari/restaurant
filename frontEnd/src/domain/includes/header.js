import React ,{useContext,useEffect}from 'react';
import { Link , useHistory } from 'react-router-dom';
import LoginContext from '../pages/context/LoginContext';
import { useSelector ,useDispatch} from "react-redux";
import { addToFav } from '../pages/feature/itemSlice';
const Header = () =>  {
    const history = useHistory();
    const loginContext = useContext(LoginContext);
	const dispatch = useDispatch();
    const username=loginContext.userData==undefined ?'':loginContext.userData.username
    console.log(`usernameusername`, username)
    const name = localStorage.getItem("res_user")
    ? JSON.parse(localStorage.getItem("res_user"))
    : '';

    const { cartTotalQuantity } = useSelector((state) => state.cart);
    const favItems =useSelector((state) => []);
    const logout = () =>{
        loginContext.setLogged(false)
        loginContext.setUserData('')
        localStorage.removeItem('res_user')
        localStorage.removeItem('favresItems')
        localStorage.removeItem('max_order')
        localStorage.removeItem('last_res')
        dispatch(addToFav());
        history.push('/');
    }
    return (
        <div className="header">
        <div className="header-content">
            <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="header-left">
                        <div className="search_bar dropdown show">

                        </div>
                    </div>

                    <ul className="navbar-nav header-right">

                        <li className="nav-item dropdown notification_dropdown">
                            <Link  className="nav-link bell bell-link primary" to="/cart">
                            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
                                </Link>
                        </li>



                        {username!=undefined ? <li className="nav-item dropdown header-profile">
                            <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                                <div className="header-info">
                                    <span>Hello, <strong>{username}</strong></span>
                                </div>
                                <img src="images/profile/user_default.png" width="20" alt=""/>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">

                                <Link onClick={()=>logout()} className="dropdown-item ai-icon">
                                    <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    <span className="ml-2">Logout </span>
                                </Link>
                            </div>
                        </li>:
                        <li className="nav-item dropdown header-profile">
                            <Link to='/login' className="nav-link" href="#" role="button" data-toggle="dropdown">
                                <div className="header-info">
                                    <span>Login</span>
                                </div>
                                <img src="images/profile/user_default.png" width="20" alt=""/>
                            </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    );
}

export default Header;