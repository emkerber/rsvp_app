// store values as they're entered on the rsvp form
import { combineReducers } from 'redux';

// true or false
const attendingBool = (state = false, action) => {
  switch (action.type) {
    case 'SET_RSVP_ATTENDING_BOOL':
      return action.payload;
    case 'UNSET_RSVP_ATTENDING_BOOL':
      return false;
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
  attendingBool,
  attendingDeets,
});