import React, { useState, useEffect } from "react";
import "./Player.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";


function Player(){

    const music = [
        {
          name: "Memories",
          src: "https://www.bensound.com/bensound-music/bensound-memories.mp3"
        },
        {
          name: "Creative Minds",
          src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3"
        },
        {
          name: "Acoustic Breeze",
          src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
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

    return(
        <div className="player">
        <AudioPlayer
          style={{ borderRadius: "1rem", width: "500px" }}
          autoPlay={false}
          layout="horizontal"
          src={music[trackIndex].src}
          onPlay={(e) => console.log("onPlay")}
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