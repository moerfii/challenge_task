import React, {useState, useEffect} from 'react';
import { save_local_storage, read_local_storage } from '../helpers/localStorage';
import Loader from '../helpers/Loader';
import MultiLineChart from '../helpers/MultiLineChart';
import api from '../helpers/api.js';
import "./Account.css";
import { Link } from "react-router-dom";
import {Tabs} from "antd";
import check from "../images/check.png"; 
import xmark from "../images/xmark.png"; 
import { get_current_moneypool, payout, check_artist_active } from '../web3/Web3Service';

const {TabPane} = Tabs;

function Account() {

  const [clicks, setClicks] = useState(JSON.parse(read_local_storage("id")).artistDetails.clicks);
  const [subscribed, setSubscribed] = useState(JSON.parse(read_local_storage("id")).membership);
  const [isArtist, setIsArtist] = useState(JSON.parse(read_local_storage("id")).isArtist);
  const [username, setUsername] = useState(JSON.parse(read_local_storage("id")).name);
  const [pw, setPw] = useState(JSON.parse(read_local_storage("id")).pw);
  const [artistId, setArtistId] = useState(JSON.parse(read_local_storage("id")).id);
  const [loading, setLoading] = useState(false);
  const [infoSet, setInfoSet] = useState(false);
  const [songSet, setSongSet] = useState([0,0,0]);
  const [music, setMusic] = useState([]);
  const [moneyPool, setMoneyPool] = useState(0);
  const [url, setUrl] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [artist_active, setArtistActive] = useState(false);
  

  // useEffect(() => {
  //   get_current_moneypool().then((data) => {
  //     console.log("Data fetched: " + data);
  //     setMoneyPool(data/1000000000);
  //     get_music().then((data) => {
  //       console.log("Music data fetched: " + data[0]);
  //       setMusic(data);
  //       if(isArtist){
  //         check_artist_active(JSON.parse(read_local_storage("id")).id).then((tx) => {
  //           console.log(tx);
  //           if(tx==1){
  //             setArtistActive(true);
  //           }
  //           setLoading(false);
  //         }).catch((error) => {
  //           console.log(error);
  //         });
  //       }else{
  //         setLoading(false);
  //       }
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, []);

  const call_payout = async () => {
    setLoading(true);
    var artist_ids = [];
    var artists_clicks = [];
    var data = await get_artists();
    console.log("Artists data fetched: " + data[0]);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if(element.artistDetails.clicks >= 1){
        var tx = await check_artist_active(element.id);
        if(tx==1){
          artist_ids.push(element.id);
          artists_clicks.push(element.artistDetails.clicks);
        }
      }
    }
      console.log(artist_ids);
      console.log(artists_clicks);
      var tx = await payout(artist_ids, artists_clicks);
      var res = await resetClicks(artist_ids, data);
      setLoading(false);
  }

  const resetClicks = async (data, data2) => {
    for (let i = 0; i < data.length; i++) {
      const artist = data[i];
      for (let j = 0; j < data2.length; j++) {
        const a = data2[j];
        if(a.id == artist){
          const request = {
            "id": a.id,
            "name": a.name,
            "pw": a.pw,
            "membership": a.membership,
            "isArtist": a.isArtist,
            "artistDetails":{
                "clicks": 0,
                "salary": a.artistDetails.clicks
            }
          };
          const response = await api.put(`/users/${artist}`, request);
          console.log(response.data);
        }
      }
    }
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
    setInfoSet(true);
    setUsername(event.target.value);
  }

  const changePw = (event) => {
    setInfoSet(true);
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
          "clicks": data.artistDetails.clicks,
          "salary": data.artistDetails.salary
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
    songSet[0] = 1;
    setTitle(event.target.value);
  }

  const changeUrl = (event) => {
    songSet[1] = 1;
    setUrl(event.target.value);
  }

  const changeImg = (event) => {
    songSet[2] = 1;
    setImg(event.target.value);
  }

  const newSong = async (data) => {
    const request = {
      id: 1,
      artist: username,
      artistId: data.id,
      duration: "3:00",
      image: img,
      title: title,
      url: url
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

  if(isArtist==0 || isArtist== undefined){
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
              <label>Membership: {subscribed ? 
              <img src={check} alt="check" style={{width:"30px"}}></img> :
              <img src={xmark} alt="xmark" style={{width:"30px"}}></img>}</label>
            </div>
            <div className="input-container">
              <label>Artist: {isArtist ? "Yes" : "No"}</label>
            </div>
          </form>
        </div>
        {infoSet ?
          <div className='saveButton' onClick={() => save()}>
          Save Updates
          </div> :
          <div className='saveButtonDeactivated'>
          Save Updates
          </div>
        }
        <div className='deleteButton' onClick={() => console.log("delete")}>
        Delete Account
        </div>
        {moneyPool >= 0 ?
          <div className='payoutButton' onClick={() => call_payout()}>
          Test Payout
          </div> :
          <div className='saveButtonDeactivated'>
          Test Payout
          </div>
        }
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
                <label>Artist Active: {artist_active ? 
                <img src={check} alt="check" style={{width:"30px"}}></img> :
                <img src={xmark} alt="xmark" style={{width:"30px"}}></img>}</label>
              </div>
              <div className="input-container">
                <label>Artist: {isArtist ? "Yes" : "No"}</label>
              </div>
            </form>
          </div>
          {infoSet ?
          <div className='saveButton' onClick={() => save()}>
          Save Updates
          </div> :
          <div className='saveButtonDeactivated'>
          Save Updates
          </div>
          }
          <div>
            <h1 className="welcomeMsg">
              Current # of clicks: {clicks}
            </h1>
            <h1 className="welcomeMsg">
              Current Moneypool: {moneyPool} Gwei
            </h1>
            {moneyPool >= 0 ?
            <div className='payoutButton' onClick={() => call_payout()}>
            Test Payout
            </div> :
            <div className='saveButtonDeactivated'>
            Test Payout
            </div>
            }
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
            {songSet[0]==1 && songSet[1]==1 && songSet[2]==1 ? 
            <div className='payoutButton' onClick={() => saveSong()}>
              Upload Song
            </div> : 
            <div className='saveButtonDeactivated'>
              Upload Song
            </div>
            }
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
