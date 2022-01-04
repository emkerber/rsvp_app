const pendingListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PENDING_LIST':
      return action.payload;
    case 'EMPTY_PENDING_LIST':
      return [];
    default:
      return state;
  }
};

export default pendingListReducer;