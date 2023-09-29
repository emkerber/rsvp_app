import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import inviteSaga from './invite.saga';
import visitSaga from './visit.saga';
import partySaga from './party.saga';
import guestSaga from './guest.saga';
import dutiesSaga from './duties.saga';
import pendingSaga from './pending.saga';
import attendanceSaga from './attendance.saga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    inviteSaga(),
    visitSaga(),
    partySaga(),
    guestSaga(),
    dutiesSaga(),
    pendingSaga(),
    attendanceSaga(),
  ]);
}
