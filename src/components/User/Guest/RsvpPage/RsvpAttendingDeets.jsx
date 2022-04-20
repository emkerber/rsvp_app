import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpAttendingDeets() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const attendingDeetsResponse = useSelector(store => store.invite.responses.attending_deets);

  const [deetsTemp, setDeetsTemp] = useState(attendingDeetsResponse);

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
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_DEETS', 
      payload: attendingDeetsResponse 
    }); 
  }

  // if db holds default value 'NA'
  // then render empty string
  const prepareToRender = () => {
    attendingDeetsResponse === 'NA' && 
      setDeetsTemp('');
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);
  
  return (
    <>
      {attendingCode === 'TBD' && 
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
      }
    </>
  );
}

export default RsvpAttendingDeets;