import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPendingInfo(action) {
  try {
    // payload is user_id
    const info = yield axios.get(`/api/pendings/fetch-by-user-id/${action.payload}`);

    yield put({ type: 'SET_PENDING_INFO', payload: info.data });

  } catch (error) {
    console.log('Error fetching pending info:', error);
  }
}

function* pendingSaga() {
  yield takeLatest('FETCH_PENDING_INFO', fetchPendingInfo);
}

export default pendingSaga;