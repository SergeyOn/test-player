import React from 'react';
import { useSelector } from 'react-redux';

import TrackList from './TrackList';

const TrackListContainer = () => {
  
  const trackList = useSelector(state => state.trackListReducer.tracks);
  
  return (
    <div>
      <ul>
        {trackList.length ? <TrackList tracks={trackList}/> : null}
      </ul>
    </div>
  )
}

export default TrackListContainer;
