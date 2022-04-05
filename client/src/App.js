import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import {Layout} from 'antd';
import Logo from "./images/Logo.png"; 
const {Footer, Sider, Content} = Layout;
 

const App = () => {
  return(
    <Layout>
      <Sider width={200} className="sideBar">
        <img src={Logo} alt="Logo" classname="logo"></img>
        <Link to ="/">
          <p style={{color: "#1986e6"}}> Home</p>
        </Link>
        <Link to ="/album">
          <p style={{color: "#ffffff"}}> Explore</p>
        </Link>
        
      </Sider>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<Album />} />
        </Routes>
      </Content>
    </Layout>
   
  )
};

export default App;
