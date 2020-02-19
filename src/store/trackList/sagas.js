import {
  call,
  takeLatest,
  put,
  select,
  all,
  fork
} from 'redux-saga/effects';

import {
  fetchSongsByArtist
} from 'api';

import {
  normalizeTracks
} from 'schema';

import {
  FETCH_TRACKS_REQUEST,
  CLICK_ACTIVE_TRACK,
  CLICK_NEXT_TRACK,
} from 'store/types';

import {
  setTrackActive,
  setCurrentTrack,
  setNextTrack,
  fetchTracksSuccess,
  fetchTracksFailure
} from './actions';


const selectTrackList = (state) => state.trackListReducer.tracksById;
const selectTrackId = (state) => state.trackListReducer.currentTrackId;

export function* trackListWatcherSaga() {
  yield all([
    fork(currentTrackWatcher),
    fork(nextTrackWatcher),
    fork(fetchTracksWatcher),
  ]);
};

export function* fetchTracksWatcher() {
  yield takeLatest(FETCH_TRACKS_REQUEST, fetchTracksWorker);
};

function* fetchTracksWorker({
  payload
}) {
  try {
    const { data } = yield call(fetchSongsByArtist, payload);
    const normalizedData = normalizeTracks(data.data);
    yield put(fetchTracksSuccess(normalizedData));
  } catch (err) {
    yield put(fetchTracksFailure(err));
  }
};

export function* currentTrackWatcher() {
  yield takeLatest(CLICK_ACTIVE_TRACK, currentTrackWorker);
};

function* currentTrackWorker({ payload }) {
  yield put(setTrackActive(payload));
  const trackList = yield select(selectTrackList);
  const currenTrack = yield trackList[payload];
  yield put(setCurrentTrack(currenTrack));
};

export function* nextTrackWatcher() {
  yield takeLatest(CLICK_NEXT_TRACK, nextTrackWorker);
};

function* nextTrackWorker() {
  yield put(setNextTrack());
  const trackList = yield select(selectTrackList);
  const currentTrackId = yield select(selectTrackId);
  const currentTrack = yield trackList[currentTrackId];
  yield put(setCurrentTrack(currentTrack));
};

