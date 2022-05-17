// all the deets for the most recently-saved party
const party = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PARTY':
      return action.payload;
    case 'UNSET_PARTY':
      return {};
    default:
      return state;
  }
};

export default party;