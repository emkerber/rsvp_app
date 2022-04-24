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
    yield put({ type: 'SET_GUEST_RESPONSES', payload: newResponses });
    
    // recheck if all responses have been provided
    yield put({ type: 'CHECK_ALL_RESPONSES_EXIST', payload: newResponses });

  } catch (error) {
    console.log('Error updating guest responses:', error);
  }
}

function* guestSaga() {
  yield takeLatest('CHECK_ALL_RESPONSES_EXIST', checkAllResponsesExist);
  yield takeLatest('UPDATE_GUEST_RESPONSES', updateGuestResponses);
}

export default guestSaga;