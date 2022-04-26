import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import {Tabs} from "antd";
import { library } from '../data/albumList';
import Loader from '../helpers/Loader';
import api from '../helpers/api.js';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import { get_artists, buy_membership, get_abo_price, set_abo_price, validate_abo } from '../web3/Web3Service';

const {TabPane} = Tabs;

const Home = () => {

  const [subscribed, setSubscribed] = useState(JSON.parse(read_local_storage("id")).membership);
  const [loading, setLoading] = useState(true);
  const [aboPrice, setAboPrice] = useState(0);
  const [artists, setArtists] = useState([]);
  
  useEffect(() => {
   
    get_artists().then((tx) => {
      console.log(tx);
      setArtists(tx);
      get_abo_price().then((tx) => {
        console.log(tx);
        setAboPrice(tx);
        validate_abo(JSON.parse(read_local_storage("id")).id).then((valid) => {
          console.log(valid);
          if(valid == JSON.parse(read_local_storage("id")).membership){
            setLoading(false);
          }else{
            updateUser(JSON.parse(read_local_storage("id")), 0).then((tx) => {
              setSubscribed(false);
            }).catch((error) => {
              console.log(error);
            });
            setLoading(false);
          }          
        }).catch((error) => {
          console.log(error);
          setLoading(false);
        });
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  const updateUser = async (data, valid) => {
    const request = {
      "id": data.id,
      "name": data.name,
      "pw": data.pw,
      "membership": valid,
      "isArtist": data.isArtist,
      "artistDetails":{
          "clicks": data.artistDetails.clicks
      }
    };
    const response = await api.put(`/users/${data.id}`, request);
    console.log(response.data);
    save_local_storage("id", JSON.stringify(response.data));
  }

  const buy_abo = () => {
    setLoading(true);
    buy_membership(JSON.parse(read_local_storage("id")).id, aboPrice).then((tx) => {
      console.log(tx);
      updateUser(JSON.parse(read_local_storage("id")), 1).then((tx) => {
        setLoading(false);
        setSubscribed(true);
      }).catch((error) => {
        console.log(error);
      });
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
