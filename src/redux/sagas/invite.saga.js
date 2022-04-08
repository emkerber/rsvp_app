import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* checkInvite(action) {
  try {   
    // the concatenated first and last names that were entered on the Landing Page
    const currentName = action.payload.fullName;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // get guest list in db
    const guestList = yield axios.get('/api/guestList', config);
    
    // loop through guest list
    // if a name on the guest list matches the currentName entered on the DOM
    // then set invite-status reducer to 'guest'
    for (let person of guestList.data) {
      if (person.name === currentName) {
        yield put({ type: 'SET_INVITE_STATUS', payload: 'guest' });
        yield put({ type: 'SET_RESPONSES', payload: person }); // for collecting a guest's responses, and storing their name in redux
        console.log('Guest!');
        return true;
      }
    }
    
    // get pending list in db
    const pendingList = yield axios.get('/api/pendingList', config);

    // loop through pending list
    // if a name on the pending list matches the currentName entered on the DOM
    // then check if their pending status is resolved
    // if resolved, then set invite-status reducer to 'nope'
    // if not resolved, then set invite-status reducer to 'pending'
    for (let person of pendingList.data) {
      if (person.name === currentName) {
        yield put({ type: 'SET_RESPONSES', payload: person }); // for collecting a guest's responses, and storing their name in redux
        if (person.resolved) {
          yield put({ type: 'SET_INVITE_STATUS', payload: 'nope' });
          console.log('no thx');
          return true;
        } else {
          yield put({ type: 'SET_INVITE_STATUS', payload: 'pending' });
          console.log('Limbo!');
          return true;
        }
      }
    }

    // if the name entered on the Landing Page does not match a name on the guest list nor the pending list,
    // then set invite-status-reducer to 'none'
    yield put({ type: 'SET_INVITE_STATUS', payload: 'none' });
    console.log('Not on a list!');

  } catch (error) {
    console.log('Check invite failed:', error);
  }
}

function* inviteSaga() {
  yield takeLatest('CHECK_INVITE', checkInvite);
}

export default inviteSaga;
