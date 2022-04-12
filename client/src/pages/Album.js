import React from 'react';
import "./Album.css";
import { useLocation } from 'react-router-dom';
import {ClockCircleOutlined} from '@ant-design/icons';

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
      <div className='purchaseButton' onClick={() => alert("Play the song!!!")}>
        Play
      </div>
    </div>
    <div className='tableHeader'>
      <div className='numberHeader'>#</div>
      <div className='titleHeader'>TITLE</div>
      <div className='numberHeader'><ClockCircleOutlined/></div>
    </div>
    
  </div>
{ /*
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
          })} */}
      
    </>
  );
};

export default Album;