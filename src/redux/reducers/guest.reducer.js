import { combineReducers } from 'redux';

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

export default combineReducers({
  responses,
  allResponsesExist,
  guestsList,
});