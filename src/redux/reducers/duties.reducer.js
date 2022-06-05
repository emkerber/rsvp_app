import { combineReducers } from 'redux';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const dutyResponses = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DUTY_RESPONSES':
      return action.payload;
    case 'UNSET_DUTY_RESPONSES':
      return {};
    default:
      return state;
  }
}

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// duties a specific guest has signed up for
const dutyDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DUTY_DETAILS':
      return action.payload;
    case 'UNSET_DUTY_DETAILS':
      return {};
    default:
      return state;
  }
}

// lists of guests who signed up for each of the duties
// arrays contain objects:
// { guest_id as id, first_name, last_name, details = '' }

const volunteersSetup = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEERS_SETUP':
      return action.payload;
    case 'UNSET_VOLUNTEERS_SETUP':
      return [];
    default:
      return state;
  }
}

const volunteersCleanup = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEERS_CLEANUP':
      return action.payload;
    case 'UNSET_VOLUNTEERS_CLEANUP':
      return [];
    default:
      return state;
  }
}

const volunteersHydration = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEERS_HYDRATION':
      return action.payload;
    case 'UNSET_VOLUNTEERS_HYDRATION':
      return [];
    default:
      return state;
  }
}

const volunteersPhotography = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEERS_PHOTOGRAPHY':
      return action.payload;
    case 'UNSET_VOLUNTEERS_PHOTOGRAPHY':
      return [];
    default:
      return state;
  }
}

const volunteersNone = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOLUNTEERS_NONE':
      return action.payload;
    case 'UNSET_VOLUNTEERS_NONE':
      return [];
    default:
      return state;
  }
}


export default combineReducers({
  // guests:
  dutyResponses,
  // admin:
  dutyDetails,
  volunteersSetup,
  volunteersCleanup,
  volunteersHydration,
  volunteersPhotography,
  volunteersNone
});