import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpAttendingDeets() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const attendingDeetsResponse = useSelector(store => store.invite.responses.attending_deets);

  const [showDeets, setShowDeets] = useState(false);
  const [deetsTemp, setDeetsTemp] = useState(attendingDeetsResponse);

  const handleDeetsChange = (value) => {
    setDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_ATTENDING_DEETS',
      payload: value
    });
  }

  // only show deets input if guest is maybe attending
  const checkIfShowDeets = () => {
    if (attendingCode === 'TBD') {
      setShowDeets(true);
    } else {
      setShowDeets(false);
    }
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

  // whenever the attendingCode changes, 
  // recheck if deets input should render
  useEffect(() => {
    checkIfShowDeets();
  }, [attendingCode]);

  useEffect(() => {
    setRsvpReducer();
  }, []);
  
  return (
    <>
      {showDeets && 
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