import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@mui/material';

import './LandingPage.css';

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const party = useSelector(store => store.party.id);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  let handleSubmit = (event) => {  
    event.preventDefault();

    // make sure user entered both names
    if (!firstName || !lastName) {
      alert('Please provide both names.');
      return;
    }

    // will run invite saga
    // and will ultimately set store.invite.inviteStatus
    dispatch({ type: 'CHECK_INVITE', payload: { firstName, lastName, party }});

    // save the name entered to the visits table
    dispatch({ type: 'SAVE_VISIT', payload: { firstName, lastName }});

    // save entered names in redux
    dispatch({ type: 'SET_NAME', payload: { firstName, lastName }});

    // go to Authenticate after checking name
    // which routes to either Register or Login
    history.push('/authenticate');
  }

  useEffect(() => {
    // get current party id on component load
    dispatch({ type: 'FETCH_PARTY' });
  }, []);

  // renders welcome text, two inputs,
  // and an Onward (submit) button
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
