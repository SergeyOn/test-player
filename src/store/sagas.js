import {
  all,
  fork
} from 'redux-saga/effects';
import {
  trackListWatcherSaga
} from './trackList/sagas';


export default function* sagas() {
  yield all([
    fork(trackListWatcherSaga),
  ]);
}