import React from 'react';
import "./Album.css";
import { useLocation } from 'react-router-dom';
import {ClockCircleOutlined} from '@ant-design/icons';


/*
const albumDetails = [ //to be changed
  {
    src: "https://ipfs.moralis.io:2053/ipfs/Qmf8xEYZdMtQXYv56VxxmzbtUtEVjmaFaXGCgcBqGXDAA6/music/JTwinkle.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/6/69/B.o.B_-_Strange_Clouds_-_LP_Cover.jpg",
    album: "Strange Clouds",
    song: "Airplanes",
    duration: "0:05",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Side To Side",
    duration: "0:16",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Pizza and A Coke",
    duration: "5:01",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Iceberg Lettuce",
    duration: "0:24",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Spitting Chicklets",
    duration: "1:03",
  },
  {
    src: "https://ipfs.moralis.io:2053/ipfs/QmUUhsAiUFq1B5JtzQH733CLBbUCnRekYXETMfeYG7PaZ3/music/JTiger.mp3",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/d5/Ariana_Grande_My_Everything_2014_album_artwork.png",
    album: "My Everything",
    song: "Boomerang",
    duration: "2:16",
  },
];
*/
const Album = () => {

  const {state: album} = useLocation();

  const albumDetails = [

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
  },
  {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "5",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/4.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Old MC's Farm\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/4\",\"duration\":\"0:08\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.133Z"
  },
  {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "3",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/2.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Unbreak My Heart\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/2\",\"duration\":\"0:12\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.133Z"
  },
  {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "2",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/1.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Dogs Out\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/1\",\"duration\":\"0:09\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.133Z"
  },
  {
      "token_address": "0x8a68d4e28515815cd6026416f4b2a4b647796f3e",
      "token_id": "1",
      "amount": "1",
      "contract_type": "ERC721",
      "name": "Shadow",
      "symbol": "shad",
      "token_uri": "https://gateway.moralisipfs.com/ipfs/QmcfAiN4gVRFDB3uqQKAN1hgpFk3bDG3hVVV2bBnDZNYsD/metadata/0.json",
      "metadata": "{\"image\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/6\",\"name\":\"Always Love You\",\"animation_url\":\"ipfs://QmX5NMV8hh1g5EcebX1e2Y55uQnVnKPk8YzW37wpnRWfXp/media/0\",\"duration\":\"0:09\",\"artist\":\"Snoop Jay\",\"year\":\"2022\"}",
      "synced_at": "2022-03-04T09:06:55.134Z"
  }
]



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
      <div className='purchaseButton' onClick={() => alert("Play the song!!!")}>
        Play
      </div>
    </div>
    <div className='tableHeader'>
      <div className='numberHeader'>#</div>
      <div className='titleHeader'>TITLE</div>
      <div className='numberHeader'><ClockCircleOutlined/></div>
    </div>
    
  
 
        {albumDetails &&
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
          })} 
      </div>
    </>
  );
};

export default Album;