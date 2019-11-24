import {
  put, take, all, call,
} from 'redux-saga/effects';
import { fetchHotelsAsync } from '../lib';

function* getHotels() {
  while (true) {
    const { payload: params } = yield take('HOTELS_GET_REQUEST');
    const payload = yield call(fetchHotelsAsync, params);
    yield put({ type: 'HOTELS_GET_SUCCESS', payload });
  }
}

export default function* rootSaga() {
  yield all([
    getHotels(),
  ]);
}
