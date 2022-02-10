import React from 'react';
import { useSelector } from 'react-redux';

import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

function Authenticate() {
  // create this:
  const user = useSelector((store) => store.user);

  if (user.name === 'none') {
    return <RegisterPage />
  } else {
    return <LoginPage />
  }
}

export default Authenticate;