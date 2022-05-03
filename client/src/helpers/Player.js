import React, { useState, useEffect } from "react";
import "./Player.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import api from '../helpers/api.js';


function Player(song){

    var step = 0;

    const music = [
        {
          name: song.album.title,
          src: song.album.url
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