import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@mui/material';

function RsvpParking() {
  const dispatch = useDispatch();
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const parkingResponse = useSelector(store => store.invite.responses.parking);

  const [parkingTemp, setParkingTemp] = useState('NA');
  const [overnightTemp, setOvernightTemp] = useState('during');

  const handleParkingChange = (value) => {
    // value is NA (No), or during (Yes)
    setParkingTemp(value);
    dispatch({
      type: 'SET_RSVP_PARKING',
      payload: value
    });
  }

  const handleOvernightChange = (value) => {
    // value is during (No), or overnight (Yes)
    setOvernightTemp(value);
    dispatch({
      type: 'SET_RSVP_PARKING',
      payload: value
    });
  }

  const setRsvpReducer = () => {
    dispatch({
      type: 'SET_RSVP_PARKING',
      payload: parkingResponse
    });
  }

  const prepareToRender = () => {
    if (parkingResponse === 'during') {
      setParkingTemp('during');
    } else if (parkingResponse === 'overnight') {
      setParkingTemp('during');
      setOvernightTemp('overnight');
    }
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
            
            <h2>Do you require vehicle parking?</h2>

            <Select
              className="rsvp-input"
              id="select-parking"
              value={parkingTemp}
              onChange={(event) => handleParkingChange(event.target.value)}
            >
              <MenuItem value="during">Yes</MenuItem>
              <MenuItem value="NA">Negatory</MenuItem>
            </Select>

          </FormControl>

          {parkingTemp === 'during' &&
            <FormControl>
              
              <h2>Will you be parked overnight?</h2>

              <Select
                className="rsvp-input"
                id="select-parking-overnight"
                value={overnightTemp}
                onChange={(event) => handleOvernightChange(event.target.value)}
              >
                <MenuItem value="overnight">Yes</MenuItem>
                <MenuItem value="during">Negatory</MenuItem>
              </Select>

            </FormControl>
          }
        </>
      }
    </>
  )
}

export default RsvpParking;