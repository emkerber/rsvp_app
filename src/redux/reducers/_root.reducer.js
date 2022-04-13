import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import name from './name.reducer';
// import lists from './lists.reducer';
import inviteStatus from './invite-status.reducer';
import responses from './responses.reducer';
import party from './party.reducer';

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
  inviteStatus, // string with value 'none', 'guest', 'pending', or 'nope'
  responses, // user-supplied information, in an object
  party, // partyId
});

export default rootReducer;
