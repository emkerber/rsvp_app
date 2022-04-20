import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';

function RsvpAdditionalGuests() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const additionalGuestsResponse = useSelector(store => store.invite.responses.additional_guests);

  const [addGuestsBoolTemp, setAddGuestsBoolTemp] = useState(false);
  const [addGuestsDeetsTemp, setAddGuestsDeetsTemp] = useState(additionalGuestsResponse);

  const handleAddGuestsBoolChange = (value) => {
    setAddGuestsBoolTemp(value);
  }

  const handleAddGuestsDeetsChange = (value) => {
    setAddGuestsDeetsTemp(value);
    dispatch({
      type: 'SET_RSVP_ADDITIONAL_GUESTS',
      payload: value
    });
  }

  const setRsvpReducer = () => {
    dispatch({
      type: 'SET_RSVP_ADDITIONAL_GUESTS',
      payload: additionalGuestsResponse
    });
  }

  const prepareToRender = () => {
    // if additional_guests is 'NA' in db
    additionalGuestsResponse === 'NA' ?
      // then render empty string rather than 'NA'
      setAddGuestsDeetsTemp('')
      // otherwise, if db value is not 'NA'
      :
      // but there is a value in the db
      additionalGuestsResponse &&
        // then it's something meaningful so bool is true
        setAddGuestsBoolTemp(true); 
        // and text field input renders
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);

  return (
    <>
      {attendingCode === 'YAY' &&
        <>
          <FormControl>
            
            <h2>Planning to bring anyone?</h2>

            <Select
              className="rsvp-input"
              id="select-additional-guests"
              value={addGuestsBoolTemp}
              onChange={(event) => handleAddGuestsBoolChange(event.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>Negatory</MenuItem>
            </Select>

            {addGuestsBoolTemp &&
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
        </>
      }
    </>
  );
}

export default RsvpAdditionalGuests;