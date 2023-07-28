import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const authSuccess = useSelector(store => store.user.authSuccess);
  const inviteStatus = useSelector(store => store.invite.inviteStatus);
  const userIdGuest = useSelector((store) => store.guest.responses.user_id);
  const userIdPending = useSelector((store) => store.pending.info.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    let id;
    if (userIdGuest) {
      id = userIdGuest;
    } else {
      id = userIdPending;
    }

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {username, password, inviteStatus, id}
      });

    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  // called once we know login was successful
  const goToNextPage = () => {
    // user should be routed to different pages based on inviteStatus
    switch (inviteStatus) {
      case 'guest':
        history.push('/deets');
        break;
      case 'nope':
        history.push('/nope');
        break;
      case 'pending':
        history.push('/pending');
        break;
      default:
        history.push('/pending');
    }
  }

  useEffect(() => {
    authSuccess && // set to true after successful login
      goToNextPage();
  }, [authSuccess]);

  // renders username and password inputs
  // and a Log In button
  return (
    <form className="formPanel">
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <TextField
            variant="standard"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <br/>
      <div>
        <label htmlFor="password">
          Password:
          <TextField
            variant="standard"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <br/>
      <Button
        className="btn"
        variant="contained"
        type="submit"
        onClick={login}
      >
        Log in
      </Button>
    </form>
  );
}

export default LoginForm;
