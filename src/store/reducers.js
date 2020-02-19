import { combineReducers } from 'redux';

import trackListReducer from './trackList/reducer';
import playerReducer from './player/reducer';

export default () =>
  combineReducers({
    trackListReducer: trackListReducer,
    playerReducer: playerReducer,
  });
