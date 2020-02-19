import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AudioA from './AudioA';

import {
  CLICK_NEXT_TRACK,
  TOGGLE_PLAY
} from 'store/types';

const Player = () => {

  const trackData = useSelector(store => store.playerReducer.currentTrack);
  const isPlaying = useSelector(store => store.playerReducer.isPlaying);

  const dispatch = useDispatch();

  const audioRef = useRef(new Audio());

  // const { 
  //   id,
  //   title,
  //   title_short,
  //   duration,
  //   preview,
  //   artist,
  //   album,
  // } = trackData || {};

  const calcDuration = ({target}) => {
    if (target.currentTime === target.duration) {
      dispatch({type: CLICK_NEXT_TRACK})
    }
  }

  useEffect(()=>{
    
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', calcDuration); 

    if(trackData) {
      audio.src = trackData.preview;
      audio.crossOrigin="anonymous";      
      if(isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', calcDuration)
    }
  },[trackData, isPlaying]);

  const handleClick = () => {
    dispatch({type: TOGGLE_PLAY});
  };

  const handleClickNext = () => {
    dispatch({type: CLICK_NEXT_TRACK});
  };

  console.log('player render')
  return (
    <div>
      <h1>player</h1>
      <button 
          onClick={handleClick} 
      >
        {isPlaying ? 'pause' : 'play'}
      </button>
      {/* <button 
          onClick={handleClickPrev} 
      >
        prev
      </button> */}
      <button 
          onClick={handleClickNext} 
      >
        next
      </button>
       {/* <AudioA audio={audioRef} /> */}
    </div>
  )
}

export default Player;
