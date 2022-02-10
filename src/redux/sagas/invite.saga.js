import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* checkInvite(action) {
  try {   
    const currentName = action.payload;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const guestList = yield axios.get('/api/guestList', config);
    
    for (let person of guestList.data) {
      if (person.name === currentName) {
        yield put({ type: 'SET_INVITE_STATUS', payload: 'guest' });
        yield put({ type: 'SET_RESPONSES', payload: person });
        console.log('Guest!');
        return true;
      }
    }
    
    const pendingList = yield axios.get('/api/pendingList', config);

    for (let person of pendingList.data) {
      if (person.name === currentName) {
        yield put({ type: 'SET_RESPONSES', payload: person });
        if (person.resolved) {
          yield put({ type: 'SET_INVITE_STATUS', payload: 'nope' });
          console.log('NOPE!');
          return true;
        } else {
          yield put({ type: 'SET_INVITE_STATUS', payload: 'pending' });
          console.log('Pending!');
          return true;
        }
      }
    }

    // if none of the other conditions are hit, then
    yield put({ type: 'SET_INVITE_STATUS', payload: 'none' });
    console.log('They\'re not on a list!');

  } catch (error) {
    console.log('Check invite failed:', error);
  }
}

function* inviteSaga() {
  yield takeLatest('CHECK_INVITE', checkInvite);
}

export default inviteSaga;
