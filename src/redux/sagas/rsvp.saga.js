import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* setRsvpResponses(action) {
  try {
    const ap = action.payload;
    
    put({ type: 'SET_RSVP_ATTENDING_BOOL', payload: ap.attending });
    put({ type: 'SET_RSVP_ATTENDING_DEETS', payload: false })

  } catch (error) {
    console.log('Error setting RSVP responses:', error);
  }
}

function* rsvpSaga() {
  yield takeLatest('SET_RSVP_RESPONSES', setRsvpResponses);
}

export default rsvpSaga;