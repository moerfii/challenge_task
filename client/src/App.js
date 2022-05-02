import React, {useEffect, useState} from 'react';
import {init} from './web3/Web3Service';
import { save_local_storage, read_local_storage } from './helpers/localStorage';
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

  //const [Album, setAlbum] = useState();

  useEffect(() => {
    if(read_local_storage("authenticated")==0 || read_local_storage("authenticated")== undefined ){
      save_local_storage("authenticated", 0);
    }
    console.log("App started");
  }, []);
  
  if(read_local_storage("authenticated")==0 || read_local_storage("authenticated")== undefined ){
    return(
      <Layout>
      <Layout>
        <Sider width={250} className="sideBar">
          <img src={Logo} alt="Logo" classname="logo" style={{marginBottom:"50px"}}></img>
          <Link to ="/login">
            <p style={{color: "#ffffff"}}> Start</p>
          </Link>
          <Link to ="/about">
            <p style={{color: "#ffffff"}}> About</p>
          </Link>
          
        </Sider>
        <Content>
          <Routes>    
            <Route path="/home" element={<Navigate replace to="/login"/>} />
            <Route path="/music" element={<Navigate replace to="/login"/>} />
            <Route path="/album" element={<Navigate replace to="/login"/>} />
            <Route path="/account" element={<Navigate replace to="/login"/>} />
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
            <Route path="/login" element={<Navigate replace to="/home"/>} />
            <Route path="/" element={<Navigate replace to="/login"/>} />
            <Route path="/about" element={<About />} />

            
          </Routes>
        </Content>

      </Layout>
      <Footer className='footer' style={{justifyContent: "center"}}>
        {JSON.parse(read_local_storage("id")).membership == 1 ? 
          <Player /> : null
        }
      </Footer>
    </Layout>
  )
  }
};

export default App;
