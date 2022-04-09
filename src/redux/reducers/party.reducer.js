// party is only the party id
const party = (state = 0, action) => {
  switch (action.type) {
    case 'SET_PARTY':
      return action.payload;
    case 'UNSET_PARTY':
      return 0;
    default:
      return state;
  }
};

export default party;