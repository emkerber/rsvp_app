import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// get all responses for a single guest
// payload is guests.id
function* fetchGuestResponses(action) {
  try {
    const responses = yield axios.get(`/api/guests/fetch-by-id/${action.payload}`);
    yield put({ type: 'SET_GUEST_RESPONSES', payload: responses.data });

    // recheck if all responses have been provided
    yield put({ type: 'CHECK_ALL_RESPONSES_EXIST', payload: responses.data });

  } catch (error) {
    console.log('Error fetching guest responses:', error);
  }
}

// called on Deets component load if all responses exist
function* fetchGuestsList() {
  try {
    const list = yield axios.get('/api/guests/guests-list');

    yield put({ type: 'SET_GUESTS_LIST', payload: list.data });

  } catch (error) {
    console.log('Error fetching guests list:', error);
  }
}

function* checkAllResponsesExist(action) {
  try {
    // check if there are any null RSVP form responses
    // if null is found then return
    for (let response in action.payload) {
      if (!action.payload[response]) {
        return;
      }
    }

    // if no null responses are found, ALL_RESPONSES_EXIST is true
    yield put({ type: 'ALL_RESPONSES_EXIST' });

  } catch (error) {
    console.log('Error checking if all responses exist:', error);
  }
}

// saves RSVP form responses
function* updateGuestResponses(action) {
  try {
    const ap = action.payload;

    // save rsvp form responses on submit
    yield axios.put(`/api/guests/update-responses/${ap.attendingCode}`, ap);

    // get the fresh responses
    yield put({ type: 'FETCH_GUEST_RESPONSES', payload: ap.guestId });

  } catch (error) {
    console.log('Error updating guest responses:', error);
  }
}

// executes on logout
function* unsetRsvpReducers(action) {
  try {
    yield put({ type: 'UNSET_RSVP_GUEST_ID' });
    yield put({ type: 'UNSET_RSVP_ATTENDING_CODE' });
    yield put({ type: 'UNSET_RSVP_ATTENDING_DEETS' });
    yield put({ type: 'UNSET_RSVP_EMAIL' });
    yield put({ type: 'UNSET_RSVP_DIET_RESTRICTIONS' });
    yield put({ type: 'UNSET_RSVP_ADDITIONAL_GUESTS' });
    yield put({ type: 'UNSET_RSVP_PARKING' });
    yield put({ type: 'UNSET_RSVP_SETUP_DUTY' });
    yield put({ type: 'UNSET_RSVP_CLEANUP_DUTY' });
    yield put({ type: 'UNSET_RSVP_HYDRATION_DUTY' });
    yield put({ type: 'UNSET_RSVP_PHOTO_DUTY' });
    yield put({ type: 'UNSET_RSVP_NO_DUTY' });
    yield put({ type: 'UNSET_RSVP_QUESTIONS_COMMENTS' });
  } catch (error) {
    console.log('Error unsetting Rsvp reducers:', error);
  }
}

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// get all of the lists - attending, maybe, not, no response
// called on login after user is set, if they are an admin user
function* fetchAdminData() {
  try {
    yield put({ type: 'FETCH_ATTENDING_LIST' });
    yield put({ type: 'FETCH_MAYBE_LIST' });
    yield put({ type: 'FETCH_NOT_ATTENDING_LIST' });
    yield put({ type: 'FETCH_NO_RESPONSE_LIST' });
  } catch (error) {
    console.log('Error fetching admin data:', error);
  }
}

// get all guests who are attending
function* fetchAttendingList() {
  try {
    const attendingList = yield axios.get('/api/guests/admin/attending');

    yield put({ type: 'SET_ATTENDING_LIST', payload: attendingList.data });

  } catch (error) {
    console.log('Error fetching attending list:', error);
  }
}

// get all guests who might attend
function* fetchMaybeList() {
  try {
    const maybeList = yield axios.get('/api/guests/admin/maybe');

    yield put({ type: 'SET_MAYBE_LIST', payload: maybeList.data });

  } catch (error) {
    console.log('Error fetching maybe list:', error);
  }
}

// get all guests who will not attend
function* fetchNotAttendingList() {
  try {
    const notAttendingList = yield axios.get('/api/guests/admin/not-attending');

    yield put({ type: 'SET_NOT_ATTENDING_LIST', payload: notAttendingList.data });

  } catch (error) {
    console.log('Error fetching not attending list:', error);
  }
}

// get all guests who have not responded
function* fetchNoResponseList() {
  try {
    const noResponseList = yield axios.get('/api/guests/admin/no-response');

    yield put({ type: 'SET_NO_RESPONSE_LIST', payload: noResponseList.data });

  } catch (error) {
    console.log('Error fetching guests who have not responded:', error);
  }
}

// clear the admin data reducers
// called on logout
function* unsetAdminData() {
  try {
    yield put({ type: 'UNSET_ATTENDING_LIST' });
    yield put({ type: 'UNSET_MAYBE_LIST' });
    yield put({ type: 'UNSET_NOT_ATTENDING_LIST' });
    yield put({ type: 'UNSET_NO_RESPONSE_LIST' });
  } catch (error) {
    console.log('Error unsetting admin data:', error);
  }
}

function* guestSaga() {
  // guests:
  yield takeLatest('FETCH_GUEST_RESPONSES', fetchGuestResponses);
  yield takeLatest('FETCH_GUESTS_LIST', fetchGuestsList);
  yield takeLatest('CHECK_ALL_RESPONSES_EXIST', checkAllResponsesExist);
  yield takeLatest('UPDATE_GUEST_RESPONSES', updateGuestResponses);
  yield takeLatest('UNSET_RSVP_REDUCERS', unsetRsvpReducers);
  // admin:
  yield takeLatest('FETCH_ADMIN_DATA', fetchAdminData);
  yield takeLatest('FETCH_ATTENDING_LIST', fetchAttendingList);
  yield takeLatest('FETCH_MAYBE_LIST', fetchMaybeList);
  yield takeLatest('FETCH_NOT_ATTENDING_LIST', fetchNotAttendingList);
  yield takeLatest('FETCH_NO_RESPONSE_LIST', fetchNoResponseList);
  yield takeLatest('UNSET_ADMIN_DATA', unsetAdminData);
}

export default guestSaga;