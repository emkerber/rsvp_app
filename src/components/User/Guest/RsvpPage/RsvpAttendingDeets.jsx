import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField } from '@mui/material';

function RsvpAttendingDeets() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const attendingDeets = useSelector(store => store.rsvp.attendingDeets);

  const [showDeets, setShowDeets] = useState(false);
  const [deetsTemp, setDeetsTemp] = useState(attendingDeets);

  const handleDeetsChange = (value) => {
    setDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_ATTENDING_DEETS',
      payload: value
    });
  }

  const checkIfShowDeets = () => {
    if (attendingCode === 'TBD') {
      setShowDeets(true);
    } else {
      setShowDeets(false);
    }
  }

  useEffect(() => {
    checkIfShowDeets();
  }, [attendingCode]);
  
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