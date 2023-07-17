import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';

function RsvpDietRestrict() {
  const dispatch = useDispatch();
  const dietRestrictionsResponse = useSelector(store => store.guest.responses.dietary_restrictions);

  const [dietTemp, setDietTemp] = useState('');
  const [dietDeetsTemp, setDietDeetsTemp] = useState('');

  const handleDietChange = (value) => {
    setDietTemp(value);

    value === 'no' ?
      dispatch({
        type: 'SET_RSVP_DIET_RESTRICTIONS',
        payload: 'NA'
      })
      : // if value is not no, we need more information
      dispatch({
        type: 'SET_RSVP_DIET_RESTRICTIONS',
        payload: ''
      })
  }

  const handleDietDeetsChange = (value) => {
    setDietDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_DIET_RESTRICTIONS',
      payload: value
    })
  }
  
  const setRsvpReducer = () => {
    dietRestrictionsResponse &&
      dispatch({
        type: 'SET_RSVP_DIET_RESTRICTIONS',
        payload: dietRestrictionsResponse
      });
  }

  const prepareToRender = () => {
    // if dietary_restrictions is 'NA' in db
    if (dietRestrictionsResponse === 'NA') {
      // then select displays no
      setDietTemp('no');
    // otherwise, if dietary_restrictions has some other not null value
    } else if (dietRestrictionsResponse) {
      // then select displays yes
      setDietTemp('yes');
      // and input renders and displays db value
      setDietDeetsTemp(dietRestrictionsResponse);
    }
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);

  return (

    <FormControl>
      
      <h2>Any dietary restrictions?</h2>

      <Select
        className="rsvp-input"
        id="select-diet-restrictions"
        inputProps={{MenuProps: {disableScrollLock: true}}}
        value={dietTemp}
        onChange={(event) => handleDietChange(event.target.value)}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">Negatory</MenuItem>
      </Select>

      {dietTemp === 'yes' &&
        <>
          
          <h2>Please elaborate!</h2>

          <TextField 
            className="rsvp-input"
            id="text-diet-deets"
            value={dietDeetsTemp}
            onChange={(event) => handleDietDeetsChange(event.target.value)}
          />

        </>
      }

    </FormControl>
  );
}

export default RsvpDietRestrict;