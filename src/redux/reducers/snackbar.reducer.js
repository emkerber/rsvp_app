import { combineReducers } from 'redux';

const pendingEmailSaved = (state = false, action) => {
  switch (action.type) {
    case 'PENDING_EMAIL_SAVED':
      return true;
    case 'PENDING_EMAIL_SAVED_CLOSE':
      return false;
    default:
      return state;
  }
}

const rsvpSaved = (state = false, action) => {
  switch (action.type) {
    case 'RSVP_SAVED':
      return true;
    case 'RSVP_SAVED_CLOSE':
      return false;
    default:
      return state;
  }
}

const guestListUnlocked = (state = false, action) => {
  switch (action.type) {
    case 'GUEST_LIST_UNLOCKED':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  pendingEmailSaved,
  rsvpSaved,
  guestListUnlocked,
});