import React, {useEffect} from 'react';
import {init} from './web3/Web3Service';
import { Routes, Route, Link, Navigate, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Music from './pages/Music';
import Account from './pages/Account';
import Login from './pages/Login';
import Album from './pages/Album';
import About from './pages/About';
import Player from './helpers/Player';
import './App.css';
import {Layout} from 'antd';
import Logo from "./images/Logo.png"; 
const {Footer, Sider, Content} = Layout;



const App = () => {

  useEffect(() => {
    console.log("App started");
  }, []);
  
  if(window.location.pathname === "/login"  || window.location.pathname === "/" || window.location.pathname === "/about"){
    return(
      <Layout>
      <Layout>
        <Sider width={250} className="sideBar">
          <img src={Logo} alt="Logo" classname="logo" style={{marginBottom:"50px"}}></img>
          <Link to ="/login">
            <p style={{color: "#ffffff"}}> Login</p>
          </Link>
          <Link to ="/register">
            <p style={{color: "#ffffff"}}> Register</p>
          </Link>
          <Link to ="/about">
            <p style={{color: "#ffffff"}}> About</p>
          </Link>
          
        </Sider>
        <Content>
          <Routes>
            
            
            <Route path="/home" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/album" element={<Album />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login"/>} />
            <Route path="/about" element={<About />} />

            
          </Routes>
        </Content>

      </Layout>
     
    </Layout>

    )
  } else{
  return(
    <Layout>
      <Layout>
        <Sider width={250} className="sideBar">
          <img src={Logo} alt="Logo" classname="logo" style={{marginBottom:"50px"}}></img>
          <Link to ="/home">
            <p style={window.location.pathname === "/home"? {color: "#1d2ab9"} : 
              {color: "#ffffff"}}> Home</p>
          </Link>
          <Link to ="/music">
            <p style={window.location.pathname === "/music"? {color: "#1d2ab9"} : 
              {color: "#ffffff"}}> Explore</p>
          </Link>
          <Link to ="/account">
            <p style={window.location.pathname === "/account"? {color: "#1d2ab9"} : 
              {color: "#ffffff"}}> My Account</p>
          </Link>
          
        </Sider>
        <Content>
          <Routes>
            
            
            <Route path="/home" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/album" element={<Album />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login"/>} />
            <Route path="/about" element={<About />} />

            
          </Routes>
        </Content>

      </Layout>
      <Footer className='footer'>
        <Player />
      </Footer>
    </Layout>
  )
  }
};

export default App;
