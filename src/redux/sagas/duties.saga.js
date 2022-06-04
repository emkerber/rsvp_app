import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

function* fetchDutyResponses(action) {
  try {
    // fetch the duties the guest's signed up for
    const newDuties = yield axios.get(`/api/duties/fetch-by-id/${action.payload}`);

    // save the duties to a reducer
    yield put({ type: 'SET_DUTY_RESPONSES', payload: newDuties.data });

  } catch (error) {
    console.log('Saga error fetching duty responses:', error);
  }
}

function* saveDutyResponses(action) {
  try {
    // INSERT: guest_id, setup, cleanup, hydration, photography, none
    yield axios.post('/api/duties/save', action.payload);

    // fetch fresh set of duties, and save to reducer
    yield put({ type: 'FETCH_DUTY_RESPONSES', payload: action.payload.guestId });

  } catch (error) {
    console.log('Saga error saving new guest duty responses:', error);
  }
}

function* updateDutyResponses(action) {
  try {
    // UPDATE: guest_id, setup, cleanup, hydration, photography, none
    yield axios.put('/api/duties/update', action.payload);

    // fetch fresh set of duties, and save to reducer
    yield put({ type: 'FETCH_DUTY_RESPONSES', payload: action.payload.guestId  });

  } catch (error) {
    console.log('Saga error updating duty responses:', error);
  }
}

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

function* fetchDutyDetails(action) {
  try {
    // action.payload is guest_id
    const details = yield axios.get(`/api/duties/admin/details/${action.payload}`);

    yield put({ type: 'SET_DUTY_DETAILS', payload: details.data });
    
  } catch (error) {
    console.log('Error fetching duty details:', error);
  }
}

function* dutiesSaga() {
  // for guests:
  yield takeLatest('FETCH_DUTY_RESPONSES', fetchDutyResponses);
  yield takeLatest('SAVE_DUTY_RESPONSES', saveDutyResponses);
  yield takeLatest('UPDATE_DUTY_RESPONSES', updateDutyResponses);
  // for admin:
  yield takeLatest('FETCH_DUTY_DETAILS', fetchDutyDetails);
}

export default dutiesSaga;