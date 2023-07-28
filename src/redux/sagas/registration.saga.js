import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// action.payload is  username, password, inviteStatus, {name}, party
function* registerUser(action) {
  
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    // server sends back the new user id
    const registerResults = yield axios.post('/api/user/register', action.payload);
    
    // id of new user
    const id = registerResults.data[0].id;

    switch (action.payload.inviteStatus) {
      // if user is on the guest list
      case 'guest': 
        // then update guest's user id
        // where name and party id match
        yield axios.put('/api/guests/register', {...action.payload, id});
        break;
      
      // if user has been added to pending list by admin
      // because they are definitely not invited
      case 'nope':
        // then when they register, update pending person's user id
        // where name and party id match
        yield axios.put('/api/pendings/register', {...action.payload, id});
        yield put({ type: 'FETCH_PENDING_INFO', payload: id });
        break;

      // if user is neither on the guest list nor pending list
      case 'none':
        // then save their name and party_id and user_id to the pending list
        yield axios.post('/api/pendings/new', {...action.payload, id});
        yield put({ type: 'FETCH_PENDING_INFO', payload: id });
        break;
    }

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: {...action.payload, id} });

    // triggers history.push() to next page
    yield put({ type: 'AUTH_SUCCESS' });

  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
