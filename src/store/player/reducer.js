import {
  SET_CURRENT_TRACK,
  TOGGLE_PLAY
} from 'store/types';

const initialState = {
  currentTrack: null,
  isPlaying: false
};

const playerReducer = ( state = initialState, {type, payload}) => {
  switch(type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: payload,
        isPlaying: true
      }
    default:
      return state;
  }
};

export default playerReducer;
