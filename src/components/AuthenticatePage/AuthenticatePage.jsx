import React from 'react';

import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';

function Authenticate() {
  return (
    <>
      <h1>Register:</h1>
      <RegisterPage />
      <h1>Login:</h1>
      <LoginPage />
    </>
  );
}

export default Authenticate;