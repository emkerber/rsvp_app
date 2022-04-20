// store values as they're entered on the rsvp form
import { combineReducers } from 'redux';

// true or false
const attendingCode = (state = '', action) => {
  switch (action.type) {
    case 'SET_RSVP_ATTENDING_CODE':
      return action.payload;
    case 'UNSET_RSVP_ATTENDING_CODE':
      return '';
    default:
      return state;
  }
}

// YAY, TBD, NAY
const attendingDeets = (state = '', action) => {
  switch (action.type) {
    case 'SET_RSVP_ATTENDING_DEETS':
      return action.payload;
    case 'UNSET_RSVP_ATTENDING_DEETS':
      return '';
    default:
      return state;
  }
};

export default combineReducers({
  attendingCode,
  attendingDeets,
});