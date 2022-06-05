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

// get duties a specific guest signed up for
function* fetchDutyDetails(action) {
  try {
    // action.payload is guest_id
    const details = yield axios.get(`/api/duties/admin/details/${action.payload}`);

    yield put({ type: 'SET_DUTY_DETAILS', payload: details.data });

  } catch (error) {
    console.log('Error fetching duty details:', error);
  }
}

// when a guest is banished, delete their associated duties
function* banishGuestDuties(action) {
  try {
    // action.payload is guest_id
    yield axios.delete(`/api/duties/admin/banish/${action.payload}`);

    // TODO refetch all duties info for admin

  } catch (error) {
    console.log('Error deleting banished guest duties:', error);
  }
}

// get lists of guests who volunteered for each duty

function* fetchVolunteersSetup() {
  try {
    const responses = yield axios.get('/api/duties/admin/volunteers/setup');

    yield put({ type: 'SET_VOLUNTEERS_SETUP', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching volunteers for setup:', error);
  }
}

function* fetchVolunteersCleanup() {
  try {
    const responses = yield axios.get('/api/duties/admin/volunteers/cleanup');

    yield put({ type: 'SET_VOLUNTEERS_CLEANUP', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching volunteers for cleanup:', error);
  }
}

function* fetchVolunteersHydration() {
  try {
    const responses = yield axios.get('/api/duties/admin/volunteers/hydration');

    yield put({ type: 'SET_VOLUNTEERS_HYDRATION', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching volunteers for hydration:', error);
  }
}

function* fetchVolunteersPhotography() {
  try {
    const responses = yield axios.get('/api/duties/admin/volunteers/photography');

    yield put({ type: 'SET_VOLUNTEERS_PHOTOGRAPHY', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching volunteers for photography:', error);
  }
}

function* fetchVolunteersNone() {
  try {
    const responses = yield axios.get('/api/duties/admin/volunteers/none');

    yield put({ type: 'SET_VOLUNTEERS_NONE', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching volunteers for none:', error);
  }
}


function* dutiesSaga() {
  // for guests:
  yield takeLatest('FETCH_DUTY_RESPONSES', fetchDutyResponses);
  yield takeLatest('SAVE_DUTY_RESPONSES', saveDutyResponses);
  yield takeLatest('UPDATE_DUTY_RESPONSES', updateDutyResponses);
  // for admin:
  yield takeLatest('FETCH_DUTY_DETAILS', fetchDutyDetails);
  yield takeLatest('BANISH_GUEST_DUTIES', banishGuestDuties);
  yield takeLatest('FETCH_VOLUNTEERS_SETUP', fetchVolunteersSetup);
  yield takeLatest('FETCH_VOLUNTEERS_CLEANUP', fetchVolunteersCleanup);
  yield takeLatest('FETCH_VOLUNTEERS_HYDRATION', fetchVolunteersHydration);
  yield takeLatest('FETCH_VOLUNTEERS_PHOTOGRAPHY', fetchVolunteersPhotography);
  yield takeLatest('FETCH_VOLUNTEERS_NONE', fetchVolunteersNone);
}

export default dutiesSaga;