import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@mui/material';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  // const onLogin = (event) => {
  //   history.push('/login');
  // };

  let handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_NAME', payload: name});
    history.push('/authenticate');
  }

  return (
    <div className="container">
      <h2>Oh hello!</h2>
      <h3>Please enter your first and last names.</h3>

      <form onSubmit={handleSubmit}>
        <TextField 
          variant="standard" 
          value={name} 
          onChange={(event) => setName(event.target.value)} />
        <br/>
        <Button 
          variant="contained" 
          size="small" 
          id="onward-button"
          type="submit"
        >Onward</Button>
      </form>
      {/* <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          </p>
        </div>
        <div className="grid-col grid-col_4">
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;
