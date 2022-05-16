import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import {Tabs} from "antd";
import Loader from '../helpers/Loader';
import api from '../helpers/api.js';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import { get_artists, buy_membership, get_abo_price, validate_abo } from '../web3/Web3Service';

const {TabPane} = Tabs;

const Home = () => {

  const [subscribed, setSubscribed] = useState(JSON.parse(read_local_storage("id")).membership);
  const [loading, setLoading] = useState(true);
  const [aboPrice, setAboPrice] = useState(0);
  const [music, setMusic] = useState([]);
  const [artists, setArtists] = useState([]);

  const get_music = async () => {
    const response = await api.get(`/music/`);
    console.log(response.data);
    return response.data;
  };
  
  useEffect(() => {
    get_artists().then((tx) => {
      console.log(tx);
      setArtists(tx);
      get_abo_price().then((tx) => {
        console.log(tx);
        setAboPrice(tx);
        validate_abo(JSON.parse(read_local_storage("id")).id).then((valid) => {
          console.log(valid);
          get_music().then((data) => {
            console.log("Music data fetched: " + data[0]);
            setMusic(data);
          }).catch((error) => {
            console.log(error);
          });
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
          "clicks": data.artistDetails.clicks,
          "salary": data.artistDetails.salary
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
          Pearify
        </h1>
        <h2 className='welcomeMsg'>
          {"Welcome " + JSON.parse(read_local_storage("id")).name + ", enjoy your music!"}
        </h2>
        {loading ? Loader() :
        <div>
        {subscribed ? null : 
        <div>
        {/**<div className='subscriptionButton' onClick={() => buy_abo()}>
          Subscribe
        </div>*/}
        <h1 className="aboInfo">Pick the best plan for you</h1>

        <div className="pricing-box-container">
          <div className="pricing-box text-center">
            <h5>Free</h5>
            <p className="price"><sup>$</sup>0<sub>/mo</sub></p>
            <ul className="features-list">
              <li><strong>Limited</strong> Sample Songs</li>
            </ul>
            <button className="btn-primary">Subscribe</button>
          </div>

          <div className="pricing-box pricing-box-bg-image text-center">
            <h5 style={{color:"white"}}>Standard</h5>
            <p className="price"><sup>Gwei</sup>10<sub>/mo</sub></p>
            <ul className="features-list">
              <li><strong>Unlimited</strong> Music</li>
              <li><strong>1</strong> Account</li>
              <li><strong>Fair</strong> Artists Payout</li>
              <li><strong>Full</strong> Support</li>
            </ul>
            <button className="btn-primary" onClick={() => buy_abo()}>Subscribe</button>
          </div>

          <div className="pricing-box text-center">
            <h5>Platinum</h5>
            <p className="price"><sup>Gwei</sup>90<sub>/yr</sub></p>
            <ul className="features-list">
              <li><strong>Unlimited</strong> Music</li>
              <li><strong>5</strong> Accounts</li>
              <li><strong>Fair</strong> Artists Payout</li>
              <li><strong>Full</strong> Support</li>
            </ul>
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
        </div>
        }
          <div className='albums'>
            {music.map((e)=>(
              <Link to="/album" state={e} className="albumSelection">
                <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
                </img>
                <p>{e.title}</p>
                {subscribed ? <div className='purchaseButtonHome' >
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
