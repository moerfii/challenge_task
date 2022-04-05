import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Music from './pages/Music';
import Account from './pages/Account';
import Album from './pages/Album';
import './App.css';
import {Layout} from 'antd';
import Logo from "./images/Logo.png"; 
const {Footer, Sider, Content} = Layout;
 


const App = () => {
  return(
    <Layout>
      <Sider width={250} className="sideBar">
        <img src={Logo} alt="Logo" classname="logo" style={{marginBottom:"50px"}}></img>
        <Link to ="/">
          <p style={{color: "#1986e6"}}> Home</p>
        </Link>
        <Link to ="/music">
          <p style={{color: "#ffffff"}}> Explore</p>
        </Link>
        <Link to ="/account">
          <p style={{color: "#ffffff"}}> My Account</p>
        </Link>
        
      </Sider>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/album" element={<Album />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Content>

    </Layout>
   
  )
};

export default App;
