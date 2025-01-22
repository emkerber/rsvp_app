// not in use

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpPhone() {
  const dispatch = useDispatch();
  const phoneResponse = useSelector(store => store.guest.responses.phone);
  
  const [phoneTemp, setPhoneTemp] = useState('');

  const handlePhoneChange = (value) => {
    setPhoneTemp(value);

    dispatch({
      type: 'SET_RSVP_PHONE',
      payload: value
    })
  }

  const setRsvpReducer = () => {
    phoneResponse &&
      dispatch({
        type: 'SET_RSVP_PHONE',
        payload: phoneResponse
      })
  }

  const prepareToRender = () => {
    phoneResponse &&
      setPhoneTemp(phoneResponse);
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);
  
  return (
    
    <FormControl>

      <h2>Please enter your phone number to receive party updates via text message!</h2>

      <TextField 
        className="rsvp-input"
        type="phone"
        id="text-phone"
        value={phoneTemp}
        onChange={(event) => handlePhoneChange(event.target.value)}
      />

    </FormControl>
  );
}

export default RsvpPhone;