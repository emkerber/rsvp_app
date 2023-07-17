import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './Authenticate.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const authSuccess = useSelector(store => store.user.authSuccess);
  const inviteStatus = useSelector((store) => store.invite.inviteStatus);
  const name = useSelector((store) => store.visit.name);
  const party = useSelector((store) => store.party.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    // send a bunch of info so the server has all knowledge
    dispatch({
      type: 'REGISTER',
      payload: { username, password, inviteStatus, name, party },
    });
  }; // end registerUser

  // called once we know registration was successful
  const goToNextPage = () => {
    // user should be routed to different pages based on inviteStatus
    switch (inviteStatus) {
      case 'guest':
        history.push('/rsvp');
        break;
      case 'nope':
        history.push('/nope');
        break;
      case 'none':
        history.push('/thanks');
        break;
      default:
        history.push('/thanks');
    }
  }

  useEffect(() => {
    authSuccess && // set to true after successful registration and login
      goToNextPage();
  }, [authSuccess]);

  // renders username and password inputs
  // and a Register button
  return (
    <form className="formPanel">
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <TextField
            variant="standard"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <TextField
            variant="standard"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <Button
        className="btn"
        variant="contained"
        type="submit"
        onClick={registerUser}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
