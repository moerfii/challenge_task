import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import {Tabs} from "antd";
import { library } from '../helpers/albumList';

const {TabPane} = Tabs;

const Home = () => {

return(
  <>
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Tab 1" key="1">
      <h1 className='featuredTitle'>
        Pear-to-Pear Music
      </h1>
      <div className='albums'>
        {library.map((e)=>(
          <Link to="/music" state={e} className="albumSelection">
            <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
            </img>
          <p>{e.title}</p>
          </Link>
        ))}
      </div>
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>
  </>
)
}

export default Home;
