import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@mui/material';

function RsvpAttending() {
  const dispatch = useDispatch();

  // guest's guest id
  const guestIdResponse = useSelector(store => store.guest.responses.id);
  // the attending_code that's saved in the db
  const attendingCodeResponse = useSelector(store => store.guest.responses.attending_code);

  const [attendingCodeTemp, setAttendingCodeTemp] = useState('');

  // handle change to value in select input
  // set rsvp.attendingCode
  const handleAttendingChange = (value) => {
    setAttendingCodeTemp(value);
    
    dispatch({ 
      type: 'SET_RSVP_ATTENDING_CODE', 
      payload: value 
    }); 
    
    // if value is YAY or NAY then we don't need more deets
    value === 'YAY' || value === 'NAY' ?
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_DEETS', 
        payload: 'NA' 
      })
      :
      // if value is TBD or '' then we do require more info
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_DEETS', 
        payload: '' 
      });
  }

  // on view load, set rsvp guestId and attendingCode reducers
  // to values in the responses reducer
  // so PUT to server doesn't nullify values
  // when it sets all possible columns
  const setRsvpReducer = () => {
    guestIdResponse &&
      dispatch({
        type: 'SET_RSVP_GUEST_ID',
        payload: guestIdResponse
      });
    
    attendingCodeResponse && 
      dispatch({ 
        type: 'SET_RSVP_ATTENDING_CODE', 
        payload: attendingCodeResponse 
      }); 
  }

  // if attending_code has a value, assign it to the select's state
  const checkIfAttendingCode = () => {
    attendingCodeResponse && 
      setAttendingCodeTemp(attendingCodeResponse);
  }

  useEffect(() => {
    setRsvpReducer();
    checkIfAttendingCode();
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
        <MenuItem value=""></MenuItem>
        <MenuItem value="YAY">Yes!</MenuItem>
        <MenuItem value="TBD">Maybe...</MenuItem>
        <MenuItem value="NAY">Nope</MenuItem>
      </Select>

    </FormControl>
  );
}

export default RsvpAttending;