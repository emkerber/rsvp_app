import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const inviteStatus = useSelector((store) => store.invite.inviteStatus);
  const name = useSelector((store) => store.name);
  const party = useSelector((store) => store.party);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    // send a buttload of info so the server has all knowledge
    dispatch({
      type: 'REGISTER',
      payload: { username, password, inviteStatus, name, party },
    });

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
  }; // end registerUser

  // renders username and password inputs
  // and a Register button
  return (
    <form className="formPanel" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
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
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
