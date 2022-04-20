import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField, InputLabel, Input, Select, MenuItem } from '@mui/material';

function RsvpAttendingDeets() {
  const dispatch = useDispatch();
  const attendingDeets = useSelector(store => store.rsvp.attendingDeets);

  const [showDeets, setShowDeets] = useState(false);
  const [deetsTemp, setDeetsTemp] = useState('');

  const handleDeetsChange = (value) => {
    setDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_ATTENDING_DEETS',
      payload: value
    });
  }

  const checkIfShowDeets = () => {
    switch (attendingDeets) {
      case 'YAY':
        setShowDeets(false);
        break;
      case 'NAY':
        setShowDeets(false);
        break;
      case 'TBD':
        setShowDeets(true);
        break;
      default:
        setShowDeets(true);
        setDeetsTemp(attendingDeets);
        break;
    }
  }

  useEffect(() => {
    checkIfShowDeets();
  }, [attendingDeets]);
  
  return (
    <>
      {showDeets && 
        <FormControl>

          <h2>Care to elaborate?</h2>

          <TextField
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