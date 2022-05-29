import { combineReducers } from 'redux';

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR GUESTS  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const responses = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GUEST_RESPONSES': 
      return action.payload;
    case 'UNSET_GUEST_RESPONSES':
      return {};
    default:
      return state;
  }
};

const allResponsesExist = (state = false, action) => {
  switch (action.type) {
    case 'ALL_RESPONSES_EXIST':
      return true;
    case 'ALL_RESPONSES_UNSURE':
      return false;
    default:
      return state;
  }
}

const guestsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_GUESTS_LIST':
      return action.payload;
    case 'UNSET_GUESTS_LIST':
      return [];
    default:
      return state;
  }
}

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - FOR ADMIN - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const attendingList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ATTENDING_LIST':
      return action.payload;
    case 'UNSET_ATTENDING_LIST':
      return [];
    default:
      return state;
  }
}

const maybeList = (state = [], action) => {
  switch (action.type) {
    case 'SET_MAYBE_LIST':
      return action.payload;
    case 'UNSET_MAYBE_LIST':
      return [];
    default:
      return state;
  }
}

const notAttendingList = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOT_ATTENDING_LIST':
      return action.payload;
    case 'UNSET_NOT_ATTENDING_LIST':
      return [];
    default:
      return state;
  }
}

const noResponseList = (state = [], action) => {
  switch (action.type) {
    case 'SET_NO_RESPONSE_LIST':
      return action.payload;
    case 'UNSET_NO_RESPONSE_LIST':
      return [];
    default:
      return state;
  }
}


export default combineReducers({
  // guests:
  responses,
  allResponsesExist,
  guestsList,
  // admin:
  attendingList,
  maybeList,
  notAttendingList,
  noResponseList,
});