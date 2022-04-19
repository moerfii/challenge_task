import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import {Tabs} from "antd";
import { library } from '../data/albumList';
import Loader from '../helpers/Loader';
import { get_artists, buy_membership, get_abo_price, set_abo_price, _validate_abo } from '../web3/Web3Service';


const {TabPane} = Tabs;


const Home = () => {



  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aboPrice, setAboPrice] = useState(0);
  const [artists, setArtists] = useState([]);
  
  useEffect(() => {
   
    get_artists().then((tx) => {
      console.log(tx);
      setLoading(false);
      setArtists(tx);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
    get_abo_price().then((tx) => {
      console.log(tx);
      setAboPrice(tx);
      setLoading(false);
      /* _validate_abo().then((tx) => {
        console.log(tx);
        setLoading(false);
        
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      }); */
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const buy_abo = () => {
    setLoading(true);
    buy_membership(aboPrice).then((tx) => {
      console.log(tx);
      setLoading(false);
      setSubscribed(true);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }
  
  return(
    <>
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab={subscribed ? "My Music" : "Music"} key="1">
        <h1 className='featuredTitle'>
          Pear-to-Pear Music
        </h1>
        {loading ? Loader() :
        <div>
        {subscribed ? null : <div className='subscriptionButton' onClick={() => buy_abo()}>
          Subscribe
        </div>
        }
          <div className='albums'>
            {library.map((e)=>(
              <Link to="/album" state={e} className="albumSelection">
                <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
                </img>
                <p>{e.title}</p>
                {subscribed ? <div className='purchaseButtonHome' >
                  Songs
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
