// store values as they're entered on the rsvp form
import { combineReducers } from 'redux';

// YAY, TBD, NAY
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

// multiline input, NA
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

// input, NA
const dietRestrictions = (state = '', action) => {
  switch (action.type) {
    case 'SET_RSVP_DIET_RESTRICTIONS':
      return action.payload;
    case 'UNSET_RSVP_DIET_RESTRICTIONS':
      return '';
    default:
      return state;
  }
}

// input, NA
const additionalGuests = (state = '', action) => {
  switch (action.type) {
    case 'SET_RSVP_ADDITIONAL_GUESTS':
      return action.payload;
    case 'UNSET_RSVP_ADDITIONAL_GUESTS':
      return '';
    default:
      return state;
  }
}

// during, overnight, NA
const parking = (state = '', action) => {
  switch (action.type) {
    case 'SET_RSVP_PARKING':
      return action.payload;
    case 'UNSET_RSVP_PARKING':
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  attendingCode,
  attendingDeets,
  dietRestrictions,
  additionalGuests,
  parking,
});