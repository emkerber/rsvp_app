// a guest/pending user's information from the db
const responses = (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESPONSES': 
      return action.payload;
    case 'UNSET_RESPONSES':
      return {};
    default:
      return state;
  }
};

export default responses;