const inviteStatus = (state = 'none', action) => {
  switch (action.type) {
    // can be 'guest', 'pending', 'nope', or 'none'
    case 'SET_INVITE_STATUS': 
      return action.payload;
    case 'REVERT_INVITE_STATUS':
      return 'none';
    default:
      return state;
  }
};

export default inviteStatus;