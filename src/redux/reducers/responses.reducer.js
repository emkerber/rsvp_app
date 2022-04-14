// a guest/pending user's information from the db
const responses = (state = { full_name: '' }, action) => {
  switch (action.type) {
    case 'SET_RESPONSES': 
      return action.payload;
    case 'UNSET_RESPONSES':
      return { full_name: '' };
    default:
      return state;
  }
};

export default responses;