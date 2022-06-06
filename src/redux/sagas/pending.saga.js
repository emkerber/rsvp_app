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

    // fetch fresh nope list
    yield put({ type: 'FETCH_NOPE_LIST' });

  } catch (error) {
    console.log('Error adding banished to pendings:', error);
  }
}

// add a new person who is definitely not invited
function* addNope(action) {
  try {
    // action.payload is { firstName, lastName, denialMessage, partyId }
    yield axios.post('/api/pendings/admin/add-nope', action.payload);

    // fetch fresh nope list
    yield put({ type: 'FETCH_NOPE_LIST' });

    // show a success snackbar for 5 seconds
    yield put({ type: 'NEW_NOPE_SAVED' });

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

// get list of people whose guest approval is pending
function* fetchPendingList() {
  try {
    const pendingList = yield axios.get('/api/pendings/admin/pending-list');

    yield put({ type: 'SET_PENDING_LIST', payload: pendingList.data });

  } catch (error) {
    console.log('Error fetching pending list:', error);
  }
}

// when a pending person is denied
// update their existing pendings row
function* pendingDenied(action) {
  try {
    // action.payload is pendings fields plus message
    yield axios.put('/api/pendings/admin/denied', action.payload);

    // refresh the pending list
    yield put({ type: 'FETCH_PENDING_LIST' });

    // refresh the nope list
    yield put({ type: 'FETCH_NOPE_LIST' });

  } catch (error) {
    console.log('Error handling pending denial:', error);
  }
}

// when a pending person is approved to be a guest
// insert their info into guests
// then delete from pendings
function* pendingApproved(action) {
  try {
    // action.payload is pendings fields plus message
    // handle guest insert in guest saga
    yield put({ type: 'PENDING_TO_GUEST', payload: action.payload });

    // delete their data from pendings after successfully inserting it
    yield axios.delete(`/api/pendings/admin/remove-from-pending/${action.payload.id}`);

    // refresh pending list
    yield put({ type: 'FETCH_PENDING_LIST' });
    
  } catch (error) {
    console.log('Error handling pending approval:', error);
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
  yield takeLatest('FETCH_PENDING_LIST', fetchPendingList);
  yield takeLatest('PENDING_DENIED', pendingDenied);
  yield takeLatest('PENDING_APPROVED', pendingApproved);
}

export default pendingSaga;