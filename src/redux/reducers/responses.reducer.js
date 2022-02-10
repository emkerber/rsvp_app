const responses = (state = { name: 'none' }, action) => {
  switch (action.type) {
    case 'SET_RESPONSES': 
      return action.payload;
    case 'REVERT_RESPONSES':
      return { name: 'none' };
    default:
      return state;
  }
};

export default responses;