import { combineReducers } from 'redux';

// pending user submits their phone
const pendingPhoneSaved = (state = false, action) => {
  switch (action.type) {
    case 'PENDING_PHONE_SAVED':
      return true;
    case 'PENDING_PHONE_SAVED_CLOSE':
      return false;
    default:
      return state;
  }
}

// guest saves their rsvp responses
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

// admin submits a new guest
const newGuestSaved = (state = false, action) => {
  switch (action.type) {
    case 'NEW_GUEST_SAVED':
      return true;
    case 'NEW_GUEST_SAVED_CLOSE':
      return false;
    default:
      return state;
  }
}

// admin submits a new nope
const newNopeSaved = (state = false, action) => {
  switch (action.type) {
    case 'NEW_NOPE_SAVED':
      return true;
    case 'NEW_NOPE_SAVED_CLOSE':
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  pendingPhoneSaved,
  rsvpSaved,
  newGuestSaved,
  newNopeSaved,
});