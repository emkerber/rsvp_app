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
    console.log('ap:', ap.attendingCode);

  } catch (error) {
    console.log('Error updating guest responses:', error);
  }
}

function* guestSaga() {
  yield takeLatest('CHECK_ALL_RESPONSES_EXIST', checkAllResponsesExist);
  yield takeLatest('UPDATE_GUEST_RESPONSES', updateGuestResponses);
}

export default guestSaga;