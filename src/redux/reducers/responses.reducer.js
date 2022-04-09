const responses = (state = { name: '' }, action) => {
  switch (action.type) {
    case 'SET_RESPONSES': 
      return action.payload;
    case 'UNSET_RESPONSES':
      return { name: '' };
    default:
      return state;
  }
};

export default responses;