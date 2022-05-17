import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import visit from './visit.reducer';
import invite from './invite.reducer';
import party from './party.reducer';
import guest from './guest.reducer';
import pending from './pending.reducer';
import rsvp from './rsvp.reducer';
import duties from './duties.reducer';
import snackbar from './snackbar.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  visit, // name: user's first, last, full names that are entered on landing page
  invite, // inviteStatus (string)
  party, // all info for a party
  guest, // responses (object), allResponsesExist (boolean)
  pending, // info (object) holds info saved for that pending person
  rsvp, // temp responses as user fills out form
  duties, // guest's duties, all duties
  snackbar, // booleans to display all of the snackbars
});

export default rootReducer;
