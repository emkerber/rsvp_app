import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const updateGuest = (id, name) => {
  console.log('in reg saga updateGuest, here are id and name:', id, name);
  axios.put('/api/guestList/new', {id, name});
}

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    // server sends back the new user id
    const registerResults = yield axios.post('/api/user/register', action.payload);
    
    // id of new user
    const userId = registerResults.data[0].id;

    // full name the user entered
    const fullName = action.payload.fullName;

    switch (action.payload.inviteStatus) {
      // if user is on the guest list
      case 'guest': 
        // then update guest's user id
        yield updateGuest(userId, fullName);
        break;
    }
    

      

    // else if they're pending
      
      // then update pending user id

      // else save the user as pending

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
