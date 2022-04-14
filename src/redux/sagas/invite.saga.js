import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* checkInvite(action) {
  try {   
    // the first and last names that were entered on the Landing Page
    const currentFirstName = action.payload.firstName;
    const currentLastName = action.payload.lastName;

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // search guest list in db
    const guestResult = yield axios.get(`/api/guestList/${currentFirstName}/${currentLastName}`, config);
    
    // if a row is returned
    if (guestResult.data.length > 0) {
      // then they are on the guest list

      // store guest's form responses in redux
      yield put({ type: 'SET_RESPONSES', payload: guestResult.data[0] });

      // set invite-status reducer to 'guest'
      yield put({ type: 'SET_INVITE_STATUS', payload: 'guest' });
      console.log('Guest!');

      return true;
    }
    
    // search pending list in db
    const pendingResult = yield axios.get(`/api/pendingList/${currentFirstName}/${currentLastName}`, config);

    // if a row is returned
    if (pendingResult.data.length > 0) {
      // then they are on the pending list
      // store person's saved info in redux
      yield put({ type: 'SET_RESPONSES', payload: pendingResult.data[0] });

      // if the person's pending status is resolved (and they weren't previously found on the guest list)
      if (pendingResult.data[0].resolved) {
        // then they are decidedly not invited
        yield put({ type: 'SET_INVITE_STATUS', payload: 'nope' });
        console.log('no thx');
        
        return true;
      
      } else { 
        // if their pending status has not yet been resolved
        yield put({ type: 'SET_INVITE_STATUS', payload: 'pending' });
        console.log('Limbo!');
        
        return true;
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
