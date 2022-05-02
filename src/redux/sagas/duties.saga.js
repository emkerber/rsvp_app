import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGuestDuties(action) {
  try {
    // fetch the duties the guest's signed up for
    const newDuties = yield axios.get(`/api/duties/fetch-by-id/${action.payload}`);

    // save the duties to a reducer
    yield put({ type: 'SET_GUEST_DUTIES', payload: newDuties.data });

  } catch (error) {
    console.log('Saga error fetching guest duties:', error);
  }
}

function* saveGuestDuties(action) {
  try {
    // INSERT: guest_id, setup, cleanup, hydration, photography, none
    yield axios.post('/api/duties/save', action.payload);

    // fetch fresh set of duties, and save to reducer
    yield put({ type: 'FETCH_GUEST_DUTIES', payload: action.payload.guestId });

  } catch (error) {
    console.log('Saga error saving new guest duties:', error);
  }
}

function* updateGuestDuties(action) {
  try {
    // UPDATE: guest_id, setup, cleanup, hydration, photography, none
    yield axios.put('/api/duties/update', action.payload);

    // fetch fresh set of duties, and save to reducer
    yield put({ type: 'FETCH_GUEST_DUTIES', payload: action.payload.guestId  });

  } catch (error) {
    console.log('Saga error updating guest duties:', error);
  }
}

function* dutiesSaga() {
  yield takeLatest('FETCH_GUEST_DUTIES', fetchGuestDuties);
  yield takeLatest('SAVE_GUEST_DUTIES', saveGuestDuties);
  yield takeLatest('UPDATE_GUEST_DUTIES', updateGuestDuties);
}

export default dutiesSaga;