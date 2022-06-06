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
// also get all of the aggregated responses
// called on login after user is set, if they are an admin user
function* fetchAdminData() {
  try {
    yield put({ type: 'FETCH_ATTENDING_LIST' });
    yield put({ type: 'FETCH_MAYBE_LIST' });
    yield put({ type: 'FETCH_NOT_ATTENDING_LIST' });
    yield put({ type: 'FETCH_NO_RESPONSE_LIST' });
    yield put({ type: 'FETCH_DIETARY_RESTRICTIONS' });
    yield put({ type: 'FETCH_PARKING_DURING' });
    yield put({ type: 'FETCH_PARKING_OVERNIGHT' });
    yield put({ type: 'FETCH_ADDITIONAL_GUESTS' });
    yield put({ type: 'FETCH_VOLUNTEERS_SETUP' }); // duties
    yield put({ type: 'FETCH_VOLUNTEERS_CLEANUP' }); // duties
    yield put({ type: 'FETCH_VOLUNTEERS_HYDRATION' }); // duties
    yield put({ type: 'FETCH_VOLUNTEERS_PHOTOGRAPHY' }); // duties
    yield put({ type: 'FETCH_VOLUNTEERS_NONE' }); // duties
    yield put({ type: 'FETCH_QUESTIONS_COMMENTS' });
    yield put({ type: 'FETCH_NOPE_LIST' }); // people who are definitely not invited

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

function* fetchGuestDetails(action) {
  try {
    const details = yield axios.get(`/api/guests/admin/details/${action.payload}`);

    yield put({ type: 'SET_GUEST_DETAILS', payload: details.data });

  } catch (error) {
    console.log('Error fetching guest details:', error);
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
    yield put({ type: 'UNSET_GUEST_DETAILS' });
    yield put({ type: 'UNSET_DIETARY_RESTRICTIONS' });
    yield put({ type: 'UNSET_PARKING_DURING' });
    yield put({ type: 'UNSET_PARKING_OVERNIGHT' });
    yield put({ type: 'UNSET_ADDITIONAL_GUESTS' });
    yield put({ type: 'UNSET_VOLUNTEERS_SETUP' });
    yield put({ type: 'UNSET_VOLUNTEERS_CLEANUP' });
    yield put({ type: 'UNSET_VOLUNTEERS_HYDRATION' });
    yield put({ type: 'UNSET_VOLUNTEERS_PHOTOGRAPHY' });
    yield put({ type: 'UNSET_VOLUNTEERS_NONE' });
    yield put({ type: 'UNSET_QUESTIONS_COMMENTS' });
    yield put({ type: 'UNSET_NOPE_LIST' });
  } catch (error) {
    console.log('Error unsetting admin data:', error);
  }
}

// remove a specific guest from the guests table
// pending saga handles adding to pendings table
function* banishGuest(action) {
  try {
    // delete guest's duties first, as duties.guest_id is foreign key
    // action.payload is guest's id
    yield put({ type: 'BANISH_GUEST_DUTIES', payload: action.payload });
    
    // action.payload is guest's id
    yield axios.delete(`/api/guests/admin/banish/${action.payload}`);

    // refresh admin data
    yield put({ type: 'FETCH_ADMIN_DATA' });

  } catch (error) {
    console.log('Error banishing guest:', error);
  }
}

// FETCHes for aggregated responses

function* fetchDietaryRestrictions() {
  try {
    const responses = yield axios.get('/api/guests/admin/dietary-restrictions');

    yield put({ type: 'SET_DIETARY_RESTRICTIONS', payload: responses.data });

  } catch (error) {
    console.log('Error fetching dietary restrictions:', error);
  }
}

function* fetchParkingDuring() {
  try {
    const responses = yield axios.get('/api/guests/admin/parking-during');

    yield put({ type: 'SET_PARKING_DURING', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching parking during:', error);
  }
}

function* fetchParkingOvernight() {
  try {
    const responses = yield axios.get('/api/guests/admin/parking-overnight');

    yield put({ type: 'SET_PARKING_OVERNIGHT', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching parking overnight:', error);
  }
}

function* fetchAdditionalGuests() {
  try {
    const responses = yield axios.get('/api/guests/admin/additional-guests');

    yield put({ type: 'SET_ADDITIONAL_GUESTS', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching additional guests:', error);
  }
}

function* fetchQuestionsComments() {
  try {
    const responses = yield axios.get('/api/guests/admin/questions-comments');

    yield put({ type: 'SET_QUESTIONS_COMMENTS', payload: responses.data });
    
  } catch (error) {
    console.log('Error fetching questions comments:', error);
  }
}

// add a new guest to the guest list
function* addGuest(action) {
  try {
    // action.payload is { firstName, lastName, welcomeMessage, partyId }
    yield axios.post('/api/guests/admin/add-guest', action.payload);

    // get a fresh list of guests who have not yet responded
    yield put({ type: 'FETCH_NO_RESPONSE_LIST' });

    // show a success snackbar for 5 seconds
    yield put({ type: 'NEW_GUEST_SAVED' });

  } catch (error) {
    console.log('Error adding new guest:', error);
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
  yield takeLatest('FETCH_GUEST_DETAILS', fetchGuestDetails);
  yield takeLatest('UNSET_ADMIN_DATA', unsetAdminData);
  yield takeLatest('BANISH_GUEST', banishGuest);
  yield takeLatest('FETCH_DIETARY_RESTRICTIONS', fetchDietaryRestrictions);
  yield takeLatest('FETCH_PARKING_DURING', fetchParkingDuring);
  yield takeLatest('FETCH_PARKING_OVERNIGHT', fetchParkingOvernight);
  yield takeLatest('FETCH_ADDITIONAL_GUESTS', fetchAdditionalGuests);
  yield takeLatest('FETCH_QUESTIONS_COMMENTS', fetchQuestionsComments);
  yield takeLatest('ADD_GUEST', addGuest);
}

export default guestSaga;