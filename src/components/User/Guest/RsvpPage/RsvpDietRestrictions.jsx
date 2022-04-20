import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';

function RsvpDietRestrict() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const dietRestrictionsResponse = useSelector(store => store.invite.responses.dietary_restrictions);

  const [dietBoolTemp, setDietBoolTemp] = useState(false);
  const [dietDeetsTemp, setDietDeetsTemp] = useState(dietRestrictionsResponse);

  const handleDietBoolChange = (value) => {
    setDietBoolTemp(value);
  }

  const handleDietDeetsChange = (value) => {
    setDietDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_DIET_RESTRICTIONS',
      payload: value
    })
  }
  
  const setRsvpReducer = () => {
    dispatch({
      type: 'SET_RSVP_DIET_RESTRICTIONS',
      payload: dietRestrictionsResponse
    });
  }

  const prepareToRender = () => {
    // if dietary_restrictions is 'NA' in db
    dietRestrictionsResponse === 'NA' ?
      // then render empty string rather than 'NA'
      setDietDeetsTemp('')
      // otherwise, if db value is not 'NA'
      :
      // but there is a value in the db
      dietRestrictionsResponse &&
        // then it's something meaningful so bool is true
        setDietBoolTemp(true);
        // and text field input renders
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);

  return (
    <>
      {attendingCode === 'YAY' &&
        <FormControl>
          
          <h2>Any dietary restrictions?</h2>

          <Select
            className="rsvp-input"
            id="select-diet-restrictions"
            value={dietBoolTemp}
            onChange={(event) => handleDietBoolChange(event.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>Negatory</MenuItem>
          </Select>

          {dietBoolTemp &&
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
      }
    </>
  );
}

export default RsvpDietRestrict;