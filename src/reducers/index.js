import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import { getUniqArray } from '../lib';

const hotels = handleActions({
  [actions.getHotelsSuccess](state, { payload }) {
    return getUniqArray([...state, ...payload]);
  },
}, []);

const filters = handleActions({
  [actions.getHotelsSuccess](state, { payload }) {
    return getUniqArray([...state, ...payload.map(item => item.region)]);
  },
}, []);

const hotelsFethingState = handleActions({
  [actions.getHotelsRequest]() {
    return 'requested';
  },
  [actions.getHotelsSuccess]() {
    return 'finished';
  },
  [actions.getHotelsFailure]() {
    return 'failed';
  },
}, 'none');

const filter = handleActions({
  [actions.setFilter](state, { payload }) {
    return payload;
  },
}, 'none');

export default combineReducers({
  hotels,
  filters,
  hotelsFethingState,
  filter,
});
