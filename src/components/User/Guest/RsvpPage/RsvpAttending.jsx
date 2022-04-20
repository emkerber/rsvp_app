import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormGroup, InputLabel, Input, Select, MenuItem } from '@mui/material';

function RsvpAttending() {
  const dispatch = useDispatch();
  const attendingDeets = useSelector(store => store.invite.responses.attending_deets);

  const [attendingTemp, setAttendingTemp] = useState(attendingDeets);

  // handle change to value in select input
  // set rsvp.attendingBool and rsvp.attendingDeets
  const handleAttendingChange = (value) => {
    setAttendingTemp(value);
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_DEETS', 
      payload: value 
    }); 
    if (value === 'YAY') {
      dispatch({
        type: 'SET_RSVP_ATTENDING_BOOL',
        payload: true
      });
    } else {
      dispatch({
        type: 'SET_RSVP_ATTENDING_BOOL',
        payload: false
      });
    }
  }

  // on view load, set rsvp attending reducers
  // to values in the responses reducer
  // so PUT to server doesn't nullify values
  // when it sets all possible columns
  const setRsvpReducers = () => {
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_DEETS', 
      payload: attendingDeets 
    }); 
    if (attendingDeets === 'YAY') {
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_BOOL', 
        payload: true 
      }); 
    } else {
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_BOOL', 
        payload: false 
      }); 
    }
  }

  useEffect(() => {
    setRsvpReducers();
  }, []);
  
  return (
    <FormControl>
        
      <h2>Will you attend?!</h2>

      {/* <InputLabel id="select-attending-label">Will you attend?!</InputLabel> */}
        
      <Select
        className="rsvp-input"
        labelId="select-attending-label"
        id="select-attending"
        value={attendingTemp}
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