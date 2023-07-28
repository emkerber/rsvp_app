import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
// action.payload from LoginForm is {username, password, inviteStatus, id}
// action.payload from registration.saga is {username, password, inviteStatus, {name}, party, id}
// id is user_id
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('/api/user/login', action.payload, config);

    // after the user has logged in
    // get the user information from the server
    yield put({ type: 'FETCH_USER' });

    // triggers history.push() to next page
    yield put({ type: 'AUTH_SUCCESS' });

    // GET all of the user's info after they've successfully logged in
    if (action.payload.inviteStatus === 'guest') {
      // get guest info by user id, and set guest responses
      // check all responses exist
      // fetch duty responses
      yield put({ type: 'FETCH_GUEST_RESPONSES_BY_USER_ID', payload: action.payload.id });

    } else if (action.payload.inviteStatus === 'pending') {
      // get and set pending info by user id
      yield put({ type: 'FETCH_PENDING_INFO', payload: action.payload.id })
    }

  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });

    // sets false
    // when set true, Register and Login will history.push() to next page
    yield put({ type: 'UNSET_AUTH_SUCCESS' });

    // also empty the reducers I made
    yield put({ type: 'UNSET_NAME' });
    yield put({ type: 'UNSET_INVITE_STATUS' });
    yield put({ type: 'UNSET_GUEST_RESPONSES' });
    yield put({ type: 'UNSET_DUTY_RESPONSES' });
    yield put({ type: 'ALL_RESPONSES_UNSURE' });
    yield put({ type: 'UNSET_RSVP_REDUCERS' });
    yield put({ type: 'UNSET_GUESTS_LIST' });
    yield put({ type: 'UNSET_ADMIN_DATA' });

  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
