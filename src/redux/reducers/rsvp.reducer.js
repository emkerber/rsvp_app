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

// input, NA
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

// input, NA
const additionalGuests = (state = 'NA', action) => {
  switch (action.type) {
    case 'SET_RSVP_ADDITIONAL_GUESTS':
      return action.payload;
    case 'UNSET_RSVP_ADDITIONAL_GUESTS':
      return 'NA';
    default:
      return state;
  }
}

// during, overnight, NA
const parking = (state = 'NA', action) => {
  switch (action.type) {
    case 'SET_RSVP_PARKING':
      return action.payload;
    case 'UNSET_RSVP_PARKING':
      return 'NA';
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