import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import {Layout} from 'antd';
const {Footer, Sider, Content} = Layout;

const App = () => {
  return(
    <Layout>
      <Sider>
        Sider
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
