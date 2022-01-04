const guestListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GUEST_LIST':
      return action.payload;
    case 'EMPTY_GUEST_LIST':
      return [];
    default:
      return state;
  }
};

export default guestListReducer;