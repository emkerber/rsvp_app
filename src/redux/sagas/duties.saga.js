import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGuestDuties(action) {
  // fetch the duties the guest's signed up for
  const newDuties = yield axios.get(`/api/duties/fetch-by-id/${action.payload}`);

  // save the duties to a reducer
  yield put({ type: 'SET_GUEST_DUTIES', payload: newDuties.data });
}

function* dutiesSaga() {
  yield takeLatest('FETCH_GUEST_DUTIES', fetchGuestDuties);
}

export default dutiesSaga;