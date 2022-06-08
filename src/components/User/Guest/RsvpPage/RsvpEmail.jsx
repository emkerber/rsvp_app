import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpEmail() {
  const dispatch = useDispatch();
  const emailResponse = useSelector(store => store.guest.responses.email);
  
  const [emailTemp, setEmailTemp] = useState('');

  const handleEmailChange = (value) => {
    setEmailTemp(value);

    dispatch({
      type: 'SET_RSVP_EMAIL',
      payload: value
    })
  }

  const setRsvpReducer = () => {
    emailResponse &&
      dispatch({
        type: 'SET_RSVP_EMAIL',
        payload: emailResponse
      })
  }

  const prepareToRender = () => {
    emailResponse &&
      setEmailTemp(emailResponse);
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);
  
  return (
    
    <FormControl>

      <h2>Please enter your email if you would like to receive party updates!</h2>

      <TextField 
        className="rsvp-input"
        id="text-email"
        value={emailTemp}
        onChange={(event) => handleEmailChange(event.target.value)}
      />

    </FormControl>
  );
}

export default RsvpEmail;