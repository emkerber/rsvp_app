import React from 'react';
import { useSelector } from 'react-redux';

import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

function Authenticate() {
  const responses = useSelector((store) => store.responses);

  // if there is not yet a user_id associated with the name entered on the Landing Page
  // then render the Register Page
  // if there is a user_id then the user has previously registered
  // so render the Login Page
  if (!responses.user_id) {
    console.log('no user id');
    return <RegisterPage />
  } else {
    console.log('yes user id!');
    return <LoginPage />
  }
}

export default Authenticate;