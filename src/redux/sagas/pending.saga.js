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

// payload is an object with email and pendings table row id
function* updateEmail(action) {
  try {
    yield axios.put('/api/pendings/email', action.payload);

    // refresh pending.info reducer
    yield put({ type: 'FETCH_PENDING_INFO', payload: action.payload.userId });
    
  } catch (error) {
    console.log('Error updating pending email:', error);
  }
}

function* pendingSaga() {
  yield takeLatest('FETCH_PENDING_INFO', fetchPendingInfo);
  yield takeLatest('UPDATE_PENDING_EMAIL', updateEmail);
}

export default pendingSaga;