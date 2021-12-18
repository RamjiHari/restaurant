import React from 'react';
import Home from '../pages/home/Home';
import ChatBox from './chatBox';
import Footer from './footer';
import Header from './header';
import NavHeader from './navHeader';
import Sidebar from './sidebar';
const Main = () => {
    return (
        <div>
            <NavHeader/>
            <ChatBox/>
            <Header/>
            <Sidebar/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default Main;