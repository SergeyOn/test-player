import {
  FETCH_TRACKS_SUCCESS,
  SET_TRACK_ACTIVE,
  SELECT_NEXT_TRACK,
} from 'store/types';

const initialState = {
  tracks: [],
  tracksById: {},
  loading: false,
  error: null,
};

const trackListReducer = ( state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: payload.result,
        tracksById: payload.entities.tracks,
        loading: false,
        error: null,
      }
    case SELECT_NEXT_TRACK: {

      const prevTrackId = state.currentTrackId;
      const prevTrackIdx = state.tracks.indexOf(prevTrackId);
      const prevTrack = state.tracksById[prevTrackId];

      const nextTrackId = state.tracks[prevTrackIdx + 1] || state.tracks[0];
      const nextTrack = state.tracksById[nextTrackId];

      return {
        ...state,
        tracksById: {
          ...state.tracksById,
          [prevTrackId]: { 
            ...prevTrack,
            active: false // set previous track to inactive
        },          
          [nextTrackId]: {
            ...nextTrack,
            active: true
          },
        },
        currentTrackId: nextTrack.id,
      }
    }
    case SET_TRACK_ACTIVE: {
      const prevTrackId = state.currentTrackId ? state.currentTrackId : payload;
      const prevTrack = state.tracksById[prevTrackId];
      
      const activeTrack = state.tracksById[payload];
      
      return {
        ...state,
        tracksById: {
          ...state.tracksById,
          [prevTrackId]: { 
            ...prevTrack,
            active: false // set previous track to inactive
          },
          [payload]: {
            ...activeTrack,
            active: true
          },
        },
        currentTrackId: payload,
      }
    };
    default:
      return state;
  }
}

export default trackListReducer;