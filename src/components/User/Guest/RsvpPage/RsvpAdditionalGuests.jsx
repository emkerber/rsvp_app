import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';

function RsvpAdditionalGuests() {
  const dispatch = useDispatch();
  const additionalGuestsResponse = useSelector(store => store.guest.responses.additional_guests);

  const [addGuestsTemp, setAddGuestsTemp] = useState('');
  const [addGuestsDeetsTemp, setAddGuestsDeetsTemp] = useState('');

  const handleAddGuestsChange = (value) => {
    setAddGuestsTemp(value);
    
    // if the value is no
    value === 'no' ?
      // that's all the info we need, reducer gets a value
      dispatch({
        type: 'SET_RSVP_ADDITIONAL_GUESTS',
        payload: 'NA'
      })
      :
      // otherwise, we need more info, empty the reducer
      dispatch({
        type: 'SET_RSVP_ADDITIONAL_GUESTS',
        payload: ''
      });
  }

  const handleAddGuestsDeetsChange = (value) => {
    setAddGuestsDeetsTemp(value);
    // save the details entered
    dispatch({
      type: 'SET_RSVP_ADDITIONAL_GUESTS',
      payload: value
    });
  }

  const setRsvpReducer = () => {
    additionalGuestsResponse &&
      dispatch({
        type: 'SET_RSVP_ADDITIONAL_GUESTS',
        payload: additionalGuestsResponse
      });
  }

  const prepareToRender = () => {
    // if additional_guests is 'NA' in db
    if (additionalGuestsResponse === 'NA') {
      // then select displays no
      setAddGuestsTemp('no');
    // otherwise, if additional_guests has some other not null value
    } else if (additionalGuestsResponse) {
      // then select displays yes
      setAddGuestsTemp('yes'); 
      // and input box renders and contains db value
      setAddGuestsDeetsTemp(additionalGuestsResponse);
    }
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);

  return (
    <FormControl>
      
      <h2>Planning to bring anyone?</h2>

      <Select
        className="rsvp-input"
        id="select-additional-guests"
        inputProps={{MenuProps: {disableScrollLock: true}}}
        value={addGuestsTemp}
        onChange={(event) => handleAddGuestsChange(event.target.value)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">Negatory</MenuItem>
      </Select>

      {addGuestsTemp === 'yes' &&
        <>
          
          <h2>Who? Please note their attendance must be approved!</h2>

          <TextField 
            className="rsvp-input"
            id="text-add-guests-deets"
            value={addGuestsDeetsTemp}
            onChange={(event) => handleAddGuestsDeetsChange(event.target.value)}
          />
          
        </>
      }

    </FormControl>
  );
}

export default RsvpAdditionalGuests;