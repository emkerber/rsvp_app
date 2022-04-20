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

  // if db holds default value 'NA'
  // then render empty string
  // if db value is not 'NA' 
  // then it holds something meaningful 
  // so diet bool temp should be true
  const prepareToRender = () => {
    dietRestrictionsResponse === 'NA' ?
      setDietDeetsTemp('')
      :
      setDietBoolTemp(true);
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