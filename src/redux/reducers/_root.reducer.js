import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import name from './name.reducer';
// import lists from './lists.reducer';
import invite from './invite.reducer';
import party from './party.reducer';
import rsvp from './rsvp.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  name, // user's first, last, full names that are entered on landing page
  // lists, // array of names in guests table, array of pending folks in pending table
  invite, // inviteStatus (string), responses (object), allResponses(boolean)
  party, // partyId
  rsvp, // temp responses as user fills out form
});

export default rootReducer;
