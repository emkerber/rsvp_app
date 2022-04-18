import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormGroup, InputLabel, Input, Select, MenuItem } from '@mui/material';


function RsvpAttending() {
  const dispatch = useDispatch();
  const responses = useSelector(store => store.invite.responses);
  // const perhapsAttending = useSelector(store => store.invite.perhapsAttending);

  const [tempAttending, setTempAttending] = useState('');

  const handleAttendingChange = (value) => {

    setTempAttending(value);
    
    switch (value) {
      case 'yes':
        dispatch({ 
          type: 'SET_RESPONSES', 
          payload: { ...responses, attending: true, perhaps_attending: 'NA' } });  
        break;
      case 'maybe':
        dispatch({ 
          type: 'SET_RESPONSES', 
          payload: { ...responses, attending: false, perhaps_attending: 'Please elaborate.' } });
        break;
      case 'nope':
        dispatch({ 
          type: 'SET_RESPONSES', 
          payload: { ...responses, attending: false, perhaps_attending: 'NA' } });
        break;
    }
  } // end handleAttendingChange

  // sets the state on page load
  // so input displays existing value
  const prepareHelper = () => {
    if (responses.attending) {
      // if attending is true
      setTempAttending('yes');
    } else if (responses.perhaps_attending === 'NA') {
      // if attending is false and perhaps_attending is NA
      // then they have responded and they're not attending
      setTempAttending('nope');
    } else if (responses.perhaps_attending) {
      // if perhaps_attending has a value, which is not NA
      // then they've indicated they're maybe attending
      setTempAttending('maybe');
    } 
      // otherwise tempAttending remains an empty string
  }

  useEffect(() => {
    prepareHelper();
  }, []);
  
  return (
    <FormControl>
        
      <h2>Will you attend?!</h2>

      {/* <InputLabel id="select-attending-label">Will you attend?!</InputLabel> */}
        
      <Select
        className="rsvp-input"
        labelId="select-attending-label"
        id="select-attending"
        value={tempAttending}
        onChange={(event) => handleAttendingChange(event.target.value)}
      >
        <MenuItem value="yes">Yes!</MenuItem>
        <MenuItem value="maybe">Maybe...</MenuItem>
        <MenuItem value="nope">Nope</MenuItem>
      </Select>

    </FormControl>
  );
}

export default RsvpAttending;