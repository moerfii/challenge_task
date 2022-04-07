import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import {Tabs} from "antd";
import { library } from '../helpers/albumList';
import Loader from '../helpers/Loader';

const {TabPane} = Tabs;


const Home = () => {

  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(function () {
      setLoading(false)
    }, 3000);
  }, []);

  
  return(
    <>
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="My Music" key="1">
        <h1 className='featuredTitle'>
          Pear-to-Pear Music
        </h1>
        {loading ? Loader() :
        <div>
        {subscribed ? null : <div className='subscriptionButton' onClick={() => setSubscribed(true)}>
          Subscribe
        </div>
        }
          <div className='albums'>
            {library.map((e)=>(
              <Link to="/album" state={e} className="albumSelection">
                <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
                </img>
                <p>{e.title}</p>
                {subscribed ? <div className='purchaseButtonHome' onClick={() => alert("Play the song!!!")}>
                  Play
                </div> : null}
              </Link>
            ))}
          </div>
        </div>
        }
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
