import {
  FETCH_TRACKS_FAIL,
  FETCH_TRACKS_SUCCESS,
  SET_TRACK_ACTIVE,
  SELECT_NEXT_TRACK,
  SET_CURRENT_TRACK,
} from 'store/types';

export const setTrackActive = data => ({
  type: SET_TRACK_ACTIVE,
  payload: data,
});

export const setCurrentTrack = data => ({
  type: SET_CURRENT_TRACK,
  payload: data,
});

export const setNextTrack = () => ({
  type: SELECT_NEXT_TRACK
});

export const fetchTracksSuccess = data => ({
  type: FETCH_TRACKS_SUCCESS,
  payload: data
});

export const fetchTracksFailure = err => ({
  type: FETCH_TRACKS_FAIL,
  payload: err.message
});