import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@mui/material';

import './LandingPage.css';

// CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // dispatch({ type: 'FETCH_GUEST_LIST' });
    // dispatch({ type: 'FETCH_PENDING_LIST' });
  }, []);

  // const onLogin = (event) => {
  //   history.push('/login');
  // };

  let handleSubmit = (event) => {  
    event.preventDefault();

    // make sure user entered both names
    if (!firstName || !lastName) {
      alert('Please provide both names.');
      return;
    }
    
    let names = { 
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}` 
    };

    // will run invite saga
    // and will ultimately set store.inviteStatus
    dispatch({ type: 'CHECK_INVITE', payload: names });

    // save the name entered to the visits table
    dispatch({ type: 'SAVE_VISIT', payload: names });

    // save entered names in redux
    dispatch({ type: 'SET_NAME', payload: names });

    // go to /authenticate after checking name
    history.push('/authenticate');
  }

  return (
    <div className="container">
      <h1>Oh hello!</h1>
      <h2>Please enter your first and last names.</h2>

      <form onSubmit={handleSubmit}>
        <TextField 
          className="landing-input"
          variant="standard" 
          value={firstName.trim()}
          onChange={(event) => setFirstName(event.target.value)} />
        <div id="landing-input-div" className="landing-input"></div>
        <TextField 
          className="landing-input"
          variant="standard" 
          value={lastName.trim()} 
          onChange={(event) => setLastName(event.target.value)} />
        <br/>
        <Button 
          variant="contained" 
          size="small" 
          id="onward-button"
          type="submit">
        Onward</Button>
      </form>
    </div>
  );
}

export default LandingPage;
