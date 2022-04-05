import React from 'react';
import "./Album.css";
import { useLocation } from 'react-router-dom';
import {ClockCircleOutlined} from '@ant-design/icons';

const Album = () => {

  const {state: album} = useLocation();

  //add smart contract call here later...
  const response = [];
  
  return (
  <>
  <div className='albumContent'>
    <div className='topBan'>
      <img src={album.image} className="albumCover"></img>
      <div className='albumDeets'>
        <div>Album</div>
        <div className='title'>{album.title}</div>
        <div className='artist'>Name of the Artist</div>
      </div>
    </div>
    <div className='topBan'>
      <div className='purchaseButton' onClick={() => alert("Buy the song!!!")}>
        Purchase
      </div>
    </div>
    <div className='tableHeader'>
      <div className='numberHeader'>#</div>
      <div className='titleHeader'>TITLE</div>
      <div className='numberHeader'><ClockCircleOutlined/></div>
    </div>
    
  </div>
  </>
)
}

export default Album;
