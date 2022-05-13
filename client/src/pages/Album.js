import React, {useState} from 'react';
import "./Album.css";
import { useLocation } from 'react-router-dom';
import {ClockCircleOutlined} from '@ant-design/icons';
import { read_local_storage } from '../helpers/localStorage';


const Album = ({setSong}) => {

  const {state: song} = useLocation();
  const [subscribed, setSubscribed] = useState(JSON.parse(read_local_storage("id")).membership);

  /**const albumDetails = [

    {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "4",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/3.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Head Shoulder\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/3\",\"duration\":\"0:09\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.133Z"
  },
  {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "6",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/5.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Pizza with a Coke\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/5\",\"duration\":\"0:09\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.133Z"
  }
]*/
  
  return (
  <>
  <div className='albumContent'>
    <div className='topBan'>
      <img src={song.image} className="albumCover"></img>
      <div className='albumDeets'>
        <div>Song</div>
        <div className='title'>{song.title}</div>
        <div className='artist'>{song.artist}</div>
      </div>
    </div>
    <div className='topBan'>
      {!subscribed ? 
      <div className='purchaseButton' onClick={() => alert("Buy a membership before listening to songs")}>
        Purchase
      </div>:
      <div className='purchaseButton' onClick={() => setSong(song)}>
        Play
      </div>}
    </div>
    <div className='tableHeader'>
      <div className='numberHeader'>#</div>
      <div className='titleHeader'>TITLE</div>
      <div className='numberHeader'><ClockCircleOutlined/></div>
    </div>
      <div className="tableContent" style={{ color: "rgb(205, 203, 203)" }}>
        <div className="numberHeader">{1}</div>
        <div className="titleHeader">
          {song.title}
        </div>
        <div className="numberHeader">{song.duration}</div>
      </div>
        {/**albumDetails &&
          albumDetails.map((song, i) => {
            song = JSON.parse(song.metadata);
            return (
              <>
                <div className="tableContent">
                  <div className="numberHeader">{i + 1}</div>
                  <div
                    className="titleHeader"
                    style={{ color: "rgb(205, 203, 203)" }}
                  >
                    {song.name}
                  </div>
                  <div className="numberHeader">{song.duration}</div>
                </div>
              </>
            );
          })*/} 
      </div>
    </>
  );
};

export default Album;