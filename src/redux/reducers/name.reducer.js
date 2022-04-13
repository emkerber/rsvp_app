// state is set to an object with properties:
// firstName
// lastName
// fullName

const nameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.payload;
    case 'UNSET_NAME':
      return {};
    default:
      return state;
  }
};

export default nameReducer;