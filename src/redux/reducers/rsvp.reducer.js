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
const attendingDeets = (state = 'NA', action) => {
  switch (action.type) {
    case 'SET_RSVP_ATTENDING_DEETS':
      return action.payload;
    case 'UNSET_RSVP_ATTENDING_DEETS':
      return 'NA';
    default:
      return state;
  }
};

// multiline input, or NA
const dietRestrictions = (state = 'NA', action) => {
  switch (action.type) {
    case 'SET_RSVP_DIET_RESTRICTIONS':
      return action.payload;
    case 'UNSET_RSVP_DIET_RESTRICTIONS':
      return 'NA';
    default:
      return state;
  }
}

export default combineReducers({
  attendingCode,
  attendingDeets,
  dietRestrictions,
});