import React from 'react';
import {SearchOutlined, DownCircleOutlined} from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Music from './pages/Music';
import './App.css';
import logo from "./images/logo.jpg";
import {Layout} from 'antd';
const {Footer, Sider, Content} = Layout;


const App = () => {
  return(
    <Layout>
        <Sider width={300}>
        <img src={logo} alt="logo" className="logo"></img>
        <div className='searchBar' style={{color: "white"}}>
          <span>Search</span>
          <SearchOutlined style={{fontSize: "30px"}}/>
        </div>
        <Link to="/">
          <p style={{color:"white"}}>Home</p>
        </Link>
        <p style={{color: "white"}}>Browse Music</p>
        <div className='recentPlayed'>
          <p className='recentTitle'>
            Recent
          </p>
          <div className='install' style={{color: "white"}}>
            <span>
              Install
            </span>
            <DownCircleOutlined style={{fontSize: "30px"}}/>
          </div>
        </div>
      </Sider>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </Content>

    </Layout>
   
  )
};

export default App;
