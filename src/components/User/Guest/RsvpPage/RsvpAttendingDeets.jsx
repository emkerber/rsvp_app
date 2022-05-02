import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpAttendingDeets() {
  const dispatch = useDispatch();
  const attendingDeetsResponse = useSelector(store => store.guest.responses.attending_deets);

  const [deetsTemp, setDeetsTemp] = useState('');

  const handleDeetsChange = (value) => {
    setDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_ATTENDING_DEETS',
      payload: value
    });
  }

  // on load, set rsvp attendingCode reducer
  // to values in the responses reducer
  // so PUT to server doesn't nullify values
  // when it sets all possible columns
  const setRsvpReducer = () => {
    attendingDeetsResponse &&
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_DEETS', 
        payload: attendingDeetsResponse 
      }); 
  }

  // if db holds a value
  // and it's not the default value 'NA'
  // then set state to existing value
  const prepareToRender = () => {
    attendingDeetsResponse && attendingDeetsResponse !== 'NA' && 
      setDeetsTemp(attendingDeetsResponse);
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);
  
  return (
    <FormControl>

      <h2>Care to elaborate?</h2>

      <TextField
        className="rsvp-input"
        id="multiline-attending-deets"
        multiline
        rows={4}
        value={deetsTemp}
        onChange={(event) => handleDeetsChange(event.target.value)}
      >
      </TextField>

    </FormControl>
  );
}

export default RsvpAttendingDeets;