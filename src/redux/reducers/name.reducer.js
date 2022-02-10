const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.payload;
    case 'CLEAR_NAME':
      return '';
    default:
      return state;
  }
};

export default nameReducer;