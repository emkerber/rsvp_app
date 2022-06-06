import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

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

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// insert banished guest into pendings table
function* addBanished(action) {
  try {
    // action.payload is { guest, explanation }
    yield axios.post('/api/pendings/admin/banished', action.payload);

    // TODO fetch fresh nopes

  } catch (error) {
    console.log('Error adding banished to pendings:', error);
  }
}

// add a new person who is definitely not invited
function* addNope(action) {
  try {
    // action.payload is { firstName, lastName, denialMessage, partyId }
    yield axios.post('/api/pendings/admin/add-nope', action.payload);

    // TODO fetch fresh nopes

  } catch (error) {
    console.log('Error adding new nope:', error);
  }
}

// get list of people who are definitely not invited
function* fetchNopeList() {
  try {
    const nopeList = yield axios.get('/api/pendings/admin/nope-list');

    yield put({ type: 'SET_NOPE_LIST', payload: nopeList.data });

  } catch (error) {
    console.log('Error fetching nope list:', error);
  }
}


function* pendingSaga() {
  // for guests
  yield takeLatest('FETCH_PENDING_INFO', fetchPendingInfo);
  yield takeLatest('UPDATE_PENDING_EMAIL', updateEmail);
  // for admin
  yield takeLatest('ADD_BANISHED', addBanished);
  yield takeLatest('ADD_NOPE', addNope);
  yield takeLatest('FETCH_NOPE_LIST', fetchNopeList);
}

export default pendingSaga;