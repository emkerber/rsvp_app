import React from 'react';
import { useSelector } from 'react-redux';

import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

function Authenticate() {
  const responses = useSelector((store) => store.responses);

  // if there is not yet a user_id associated with the name entered on the Landing Page
  if (!responses.user_id) {
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