import React from 'react';

import TrackListItem from './TrackListItem';

const TrackList = ({tracks}) => {
  const renderItems = (id, idx) => <TrackListItem key={id} id={id} idx={idx}/>
  return (
    <ul>
      {tracks && tracks.map(renderItems)}
    </ul>
  )
}

export default TrackList;
