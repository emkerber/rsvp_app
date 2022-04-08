const inviteStatus = (state = 'none', action) => {
  switch (action.type) {
    // payload can be can be 'guest', 'pending', 'nope', or 'none'
    case 'SET_INVITE_STATUS': 
      return action.payload;
    case 'UNSET_INVITE_STATUS':
      return 'none';
    default:
      return state;
  }
};

export default inviteStatus;