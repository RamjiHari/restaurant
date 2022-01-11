import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
const NavHeader = () => {
    const restaurant = useSelector((state) => state.restaurant);
    const name=restaurant.name=='' ?'' :restaurant.name
    return (

        <div className="nav-header">
        <Link to="/" className="brand-logo">
            <img className="logo-abbr" src="./images/logo.png" alt=""/>
           {name==''?<> <img className="logo-compact" src="./images/logo-text.png" alt=""/>
            <img className="brand-title" src="./images/logo-text.png" alt=""/></>
            :<>
            <img className="logo-compact" src="./images/logo-text.png" alt=""/>
            <h1 className="brand-title">{name}</h1></>
            }
        </Link>

        <div className="nav-control">
            <div className="hamburger">
                <span className="line"></span><span className="line"></span><span className="line"></span>
            </div>
        </div>
    </div>

    );
}

export default NavHeader;