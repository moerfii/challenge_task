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
    <TabPane tab="My Music" key="1">
      <h1 className='featuredTitle'>
        Pear-to-Pear Music
      </h1>
      <div className='albums'>
        {library.map((e)=>(
          <Link to="/album" state={e} className="albumSelection">
            <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
            </img>
            <p>{e.title}</p>
            <div className='purchaseButtonHome' onClick={() => alert("Buy the song!!!")}>
              Purchase
            </div>
            <div className='purchaseButtonHome' onClick={() => alert("Buy the song!!!")}>
              Play
            </div>
          </Link>
        ))}
      </div>
    </TabPane>
    <TabPane tab="Favorites" key="2">
     
    </TabPane>
    <TabPane tab="More" key="3">
      
    </TabPane>
  </Tabs>
  </>
)
}

export default Home;
