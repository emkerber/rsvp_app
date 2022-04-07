import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* saveVisit(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/visit', action.payload, config);
  
  } catch (error) {
    console.log('Save visit POST request failed:', error);
  }
}

function* visitSaga() {
  yield takeLatest('SAVE_VISIT', saveVisit);
}

export default visitSaga;