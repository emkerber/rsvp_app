import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

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
    return;

  } catch (error) {
    console.log('Error checking if all responses exist:', error);
  }
}

function* updateGuestResponses(action) {
  try {
    const ap = action.payload;

    // save rsvp form responses on submit
    yield axios.put(`/api/guests/update-responses/${ap.attendingCode}`, ap);

    // get the fresh responses
    const newResponses = yield axios.get(`/api/guests/fetch-by-id/${ap.guestId}`);
    
    // save the fresh responses
    yield put({ type: 'SET_GUEST_RESPONSES', payload: newResponses.data });
    
    // recheck if all responses have been provided
    yield put({ type: 'CHECK_ALL_RESPONSES_EXIST', payload: newResponses.data });

  } catch (error) {
    console.log('Error updating guest responses:', error);
  }
}

function* unsetRsvpReducers(action) {
  try {
    yield put({ type: 'UNSET_RSVP_GUEST_ID' });
    yield put({ type: 'UNSET_RSVP_ATTENDING_CODE' });
    yield put({ type: 'UNSET_RSVP_ATTENDING_DEETS' });
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

function* guestSaga() {
  yield takeLatest('CHECK_ALL_RESPONSES_EXIST', checkAllResponsesExist);
  yield takeLatest('UPDATE_GUEST_RESPONSES', updateGuestResponses);
  yield takeLatest('UNSET_RSVP_REDUCERS', unsetRsvpReducers);
}

export default guestSaga;