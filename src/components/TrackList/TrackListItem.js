import React from 'react';
import {
  CLICK_ACTIVE_TRACK,
} from 'store/types';

import { useSelector, useDispatch } from 'react-redux';

const TrackListItem = ({id, idx}) => {
  const item = useSelector(store => store.trackListReducer.tracksById[id]);
  const isPlaying = useSelector(store => store.playerReducer.isPlaying);
  const { title, duration, active} = item;
  const dispatch = useDispatch();
  return (
    <li
    style={{cursor: 'pointer'}}
    onClick={() => dispatch({type: CLICK_ACTIVE_TRACK, payload: id})}
    >
    <h4>{idx}</h4>
    <h2>{title} {active && 'active'} {active && isPlaying && 'very active'}</h2>
    <h3>{new Date(duration * 1000).toISOString().substr(14, 5)}</h3>
  </li>
  )
}

export default TrackListItem
