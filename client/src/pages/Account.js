import React, {useState, useEffect} from 'react';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import Loader from '../helpers/Loader';
import MultiLineChart from '../helpers/MultiLineChart';
import api from '../helpers/api.js';
import "./Account.css";
import { Link } from "react-router-dom";
import {Tabs} from "antd";
import { get_current_moneypool, payout } from '../web3/Web3Service';

const {TabPane} = Tabs;

function Account() {

  const [clicks, setClicks] = useState(JSON.parse(read_local_storage("id")).artistDetails.clicks);
  const [subscribed, setSubscribed] = useState(JSON.parse(read_local_storage("id")).membership);
  const [isArtist, setIsArtist] = useState(JSON.parse(read_local_storage("id")).isArtist);
  const [username, setUsername] = useState(JSON.parse(read_local_storage("id")).name);
  const [pw, setPw] = useState(JSON.parse(read_local_storage("id")).pw);
  const [artistId, setArtistId] = useState(JSON.parse(read_local_storage("id")).id);
  const [loading, setLoading] = useState(true);
  const [music, setMusic] = useState([]);
  const [moneyPool, setMoneyPool] = useState(0);
  const [url, setUrl] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    get_current_moneypool().then((data) => {
      console.log("Data fetched: " + data);
      setMoneyPool(data);
      get_music().then((data) => {
        console.log("Music data fetched: " + data[0]);
        setMusic(data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const payout = () => {
    setLoading(true);
    var artist_ids = [];
    var artists_clicks = [];
    get_artists().then((data) => {
      console.log("Artists data fetched: " + data[0]);
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.artistDetails.clicks >= 1){
          artist_ids.push(element.id);
          artists_clicks.push(element.artistDetails.clicks);
        }
      }
      console.log(artist_ids);
      console.log(artists_clicks);
      /**payout(artistId, artist_ids, artists_clicks).then((tx) => {
        console.log(tx);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });*/
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });

    
   
    
  }

  const get_artists = async () => {
    console.log(artistId);
    const response = await api.get(`/users?isArtist=1`);
    console.log(response.data);
    return response.data;
  };

  const get_music = async () => {
    console.log(artistId);
    const response = await api.get(`/music?artistId=${artistId}`);
    console.log(response.data);
    return response.data;
  };

  const change = (event) => {
    setUsername(event.target.value);
  }

  const changePw = (event) => {
    setPw(event.target.value);
  }

  const updateUser = async (data) => {
    const request = {
      "id": data.id,
      "name": username,
      "pw": pw,
      "membership": data.membership,
      "isArtist": data.isArtist,
      "artistDetails":{
          "clicks": data.artistDetails.clicks
      }
    };
    const response = await api.put(`/users/${data.id}`, request);
    console.log(response.data);
    save_local_storage("id", JSON.stringify(response.data));
  }

  const save = () => {
    setLoading(true);
    updateUser(JSON.parse(read_local_storage("id"))).then((tx) => {
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeUrl = (event) => {
    setUrl(event.target.value);
  }

  const changeImg = (event) => {
    setImg(event.target.value);
  }

  const newSong = async (data) => {
    const request = {
      id: 1,
      artist: "Test",
      artistId: "0x26072575635461583493f72f74e94552a42245f5",
      duration: "3:00",
      image: "aa",
      title: "td ed",
      url: "aa"
    };
    console.log(request);
    const response = await api.post("/music", request);
    console.log(response);
  }

  const saveSong = () => {
    setLoading(true);
    newSong(JSON.parse(read_local_storage("id"))).then((tx) => {
      setTitle("");
      setUrl("");
      setImg("");
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  if(1!=1 /**isArtist==0 || isArtist== undefined)*/){
    return (
    <>
    <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} 
        className="container"> 
      <h1 className="featuredTitle">
        My User Account
      </h1>
    </div>
    {loading ? Loader() : 
      <div>
        <div className="form">
          <form>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" onChange={change} value={username} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" onChange={changePw} value={pw} required />
            </div>
            <div className="input-container">
              <label>Membership: {subscribed ? "Yes" : "No"}</label>
            </div>
            <div className="input-container">
              <label>Artist: {isArtist ? "Yes" : "No"}</label>
            </div>
          </form>
        </div>
        <div className='saveButton' onClick={() => save()}>
        Save Updates
        </div>
        <div className='deleteButton' onClick={() => console.log("delete")}>
        Delete Account
        </div>
        <div className='payoutButton' onClick={() => payout()}>
        Test Payout
        </div>
      </div>
    }
    </>
    )
  }else{
    return(
      <>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="My Account" key="1">
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} 
        className="container"> 
          <h1 className="featuredTitle">
            My Artist Account
          </h1>
        </div>
        {loading ? Loader() : 
        <div>
          <div className="form">
            <form>
              <div className="input-container">
                <label>Username </label>
                <input type="text" name="uname" onChange={change} value={username} required />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" onChange={changePw} value={pw} required />
              </div>
              <div className="input-container">
                <label>Membership: {subscribed ? "Yes" : "No"}</label>
              </div>
              <div className="input-container">
                <label>Artist: {isArtist ? "Yes" : "No"}</label>
              </div>
            </form>
          </div>
          <div className='saveButton' onClick={() => save()}>
          Save Updates
          </div>
          <div>
            <h1 className="welcomeMsg">
              Current # of clicks: {clicks}
            </h1>
            <h1 className="welcomeMsg">
                Current Moneypool: {moneyPool} Wei
            </h1>
            <div className='payoutButton' onClick={() => payout()}>
            Test Payout
            </div>
            <div className="container">
            <MultiLineChart />
            </div>
          </div>
        </div>
        }
        </TabPane>
        <TabPane tab="My Music" key="2">
          <h1 className="welcomeMsg">
            Music Upload
          </h1>
          {loading ? Loader() : 
          <div>
            <div className="form">
              <form>
                <div className="input-container">
                  <label>Title </label>
                  <input type="text" name="uname" onChange={changeTitle} value={title} required />
                </div>
                <div className="input-container">
                  <label>Link to Song File </label>
                  <input type="text" name="url" onChange={changeUrl} value={url} required />
                </div>
                <div className="input-container">
                  <label>Image Link </label>
                  <input type="text" name="img" onChange={changeImg} value={img} required />
                </div>
              </form>
            </div>
            <div className='payoutButton' onClick={() => saveSong()}>
              Upload Song
            </div>
            <h1 className="welcomeMsg">
              My Music
            </h1>
            <div className='albums'>
              {music.map((e)=>(
                <Link to="/album" state={e} className="albumSelection">
                  <img src={e.image} style={{width:"200px", marginBottom: "10px"}}>
                  </img>
                  <p>{e.title}</p>
                </Link>
              ))}
            </div>
          </div>}
        </TabPane>
      </Tabs>
      </>
    )
  }
}
export default Account;
