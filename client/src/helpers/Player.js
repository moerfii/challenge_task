import React, { useState, useEffect } from "react";
import "./Player.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import api from '../helpers/api.js';
//Uncomment for local file playback
import mp3_1 from '../data/Something.mp3';
import mp3_2 from '../data/Rocks_Off.flac';
import mp3_3 from '../data/Thriller.wma';
import mp3_4 from '../data/Brown_Sugar.flac';
import mp3_5 from '../data/Dont_Stop.mp3';
import mp3_6 from '../data/Dont_You.mp3';
import mp3_7 from '../data/Fat_Bottomed_Girls.m4a';
import mp3_8 from '../data/Hotel_California.m4a';
import mp3_9 from '../data/Murder_Incorporated.m4a';
import mp3_10 from '../data/My_Sweet_Lord.flac';
import mp3_11 from '../data/Riding_with_the_King.mp3';
import mp3_12 from '../data/So_Far_Away.mp3';
import mp3_13 from '../data/Space_Oddity.m4a';
import mp3_14 from '../data/Stuck_In_The_Middle_With_You.mp3';
import mp3_15 from '../data/Take_The_Long_Way_Home.mp3';
import mp3_16 from '../data/Tangled_Up_in_Blue.mp3';
import mp3_17 from '../data/Time.m4a';
import mp3_18 from '../data/Tiny_Dancer.mp3';


function Player(song){

    var step = 0;

    const music = [
        {
          name: song.album.title,
          src: 
            song.album.url == "1" ? mp3_1 : song.album.url == "2" ? mp3_2 :
            song.album.url == "3" ? mp3_3 : song.album.url == "4" ? mp3_4 :
            song.album.url == "5" ? mp3_5 : song.album.url == "6" ? mp3_6 :
            song.album.url == "7" ? mp3_7 : song.album.url == "8" ? mp3_8 :
            song.album.url == "9" ? mp3_9 : song.album.url == "10" ? mp3_10 :
            song.album.url == "11" ? mp3_11 : song.album.url == "12" ? mp3_12 :
            song.album.url == "13" ? mp3_13 : song.album.url == "14" ? mp3_14 :
            song.album.url == "15" ? mp3_15 : song.album.url == "16" ? mp3_16 :
            song.album.url == "17" ? mp3_17 : song.album.url == "18" ? mp3_18 : 
            song.album.url
        }
      ];
    
    const [trackIndex, setTrackIndex] = useState(0);
  
    const handleClickPrevious = () => {
      setTrackIndex((currentTrack) =>
        currentTrack === 0 ? music.length - 1 : currentTrack - 1
      );
    };
  
    const handleClickNext = () => {
      setTrackIndex((currentTrack) =>
        currentTrack < music.length - 1 ? currentTrack + 1 : 0
      );
    };

    const play = () => {
      console.log("play");
    }

    const pause = () => {
      console.log("pause");
    }

    const get_artist = async (id) => {
      const response = await api.get(`/users/${id}`);
      console.log(response.data);
      return response.data;
    };

    const updateUser = async (data) => {
      const request = {
        "id": data.id,
        "name": data.name,
        "pw": data.pw,
        "membership": data.membership,
        "isArtist": data.isArtist,
        "artistDetails":{
            "clicks": data.artistDetails.clicks+1
        }
      };
      const response = await api.put(`/users/${data.id}`, request);
      console.log(response.data);
    }
      
    const updateClick = () => {
      if(step==0){
        step=1;
      }else if(step == 1){
        console.log("Update Click for: " + song.album.artistId);
        get_artist(song.album.artistId).then((data) => {
          console.log("Music data fetched: " + data);
          updateUser(data).then((tx) => {
          step = 2;
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      }
    }

    return(
        <div className="player">
        <AudioPlayer
          style={{ borderRadius: "1rem", width: "500px" }}
          autoPlay={false}
          layout="horizontal"
          src={music[trackIndex].src}
          onPlay={(e) => play()}
          onPause={(e) => pause()}
          listenInterval = {10000}
          onListen={updateClick}
          showSkipControls={true}
          showJumpControls={false}
          header={`Now playing: ${music[trackIndex].name}`}
          footer=""
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
        />
      </div>
    )
}

export default Player;