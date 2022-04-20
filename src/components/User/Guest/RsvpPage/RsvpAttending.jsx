import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@mui/material';

function RsvpAttending() {
  const dispatch = useDispatch();

  // the attending_code that's saved in the db
  const attendingCode = useSelector(store => store.invite.responses.attending_code);

  const [attendingCodeTemp, setAttendingCodeTemp] = useState(attendingCode);

  // handle change to value in select input
  // set rsvp.attendingCode
  const handleAttendingChange = (value) => {
    setAttendingCodeTemp(value);
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_CODE', 
      payload: value 
    }); 
  }

  // on view load, set rsvp attendingCode reducer
  // to values in the responses reducer
  // so PUT to server doesn't nullify values
  // when it sets all possible columns
  const setRsvpReducer = () => {
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_CODE', 
      payload: attendingCode 
    }); 
  }

  const checkAttendingCodeNull = () => {
    !attendingCode && setAttendingCodeTemp('');
  }

  useEffect(() => {
    setRsvpReducer();
    checkAttendingCodeNull();
  }, []);
  
  return (
    <FormControl>
        
      <h2>Will you attend?!</h2>
        
      <Select
        className="rsvp-input"
        id="select-attending"
        value={attendingCodeTemp}
        onChange={(event) => handleAttendingChange(event.target.value)}
      >
        <MenuItem value="YAY">Yes!</MenuItem>
        <MenuItem value="TBD">Maybe...</MenuItem>
        <MenuItem value="NAY">Nope</MenuItem>
      </Select>

    </FormControl>
  );
}

export default RsvpAttending;