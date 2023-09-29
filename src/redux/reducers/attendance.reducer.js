import { combineReducers } from 'redux';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - FOR BOUNCERS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -


// array of guests not checked in
// object properties: guests.first_name, guests.last_name, 
// guests.additional_guests, attendance.id AS attendance_id, 
// attendance.*
const guestsNotHere = (state = [], action) => {
    switch (action.type) {
      case 'SET_ATT_GUESTS_NOT_HERE': 
        return action.payload;
      case 'UNSET_ATT_GUESTS_NOT_HERE':
        return [];
      default:
        return state;
    }
  };

// TODO - guests checked in

// TODO - search by first name

// TODO - guest object selected from list

export default combineReducers({
    // bouncers:
    guestsNotHere,

});