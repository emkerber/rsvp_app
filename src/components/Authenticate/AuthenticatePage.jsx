import React from 'react';
import { useSelector } from 'react-redux';

import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

function Authenticate() {
  // check if a user id has been associated with the name entered
  const userIdGuest = useSelector((store) => store.guest.responses.user_id);
  const userIdPending = useSelector((store) => store.pending.info.user_id);

  // if there is not yet a user_id associated with the name entered on the Landing Page
  if (!userIdGuest && !userIdPending) {
    console.log('no user id');
    // then render the Register Page
    return <RegisterPage />
  } else {
    // if there is a user_id then the user has previously registered
    console.log('yes user id!');
    // so render the Login Page
    return <LoginPage />
  }
}

export default Authenticate;