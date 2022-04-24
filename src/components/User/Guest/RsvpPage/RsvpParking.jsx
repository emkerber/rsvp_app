import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Select, MenuItem } from '@mui/material';

function RsvpParking() {
  const dispatch = useDispatch();
  const parkingResponse = useSelector(store => store.guest.responses.parking);

  const [parkingTemp, setParkingTemp] = useState('');
  const [overnightTemp, setOvernightTemp] = useState('');

  const handleParkingChange = (value) => {
    // value is NA (No), or during (Yes)
    setParkingTemp(value);

    // if Yes, we need more information, but otherwise, save value
    value !== 'during' &&
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
    parkingResponse &&
      dispatch({
        type: 'SET_RSVP_PARKING',
        payload: parkingResponse
    });
  }

  const prepareToRender = () => {
    if (parkingResponse === 'during') {
      setParkingTemp('during');
      setOvernightTemp('during');
    } else if (parkingResponse === 'overnight') {
      setParkingTemp('during');
      setOvernightTemp('overnight');
    } else if (parkingResponse === 'NA') {
      setParkingTemp('NA');
    }
  }

  useEffect(() => {
    setRsvpReducer();
    prepareToRender();
  }, []);
  
  return (
    <>
      <FormControl>
        
        <h2>Do you require vehicle parking?</h2>

        <Select
          className="rsvp-input"
          id="select-parking"
          value={parkingTemp}
          onChange={(event) => handleParkingChange(event.target.value)}
        >
          <MenuItem value=""></MenuItem>
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
            <MenuItem value=""></MenuItem>
            <MenuItem value="overnight">Yes</MenuItem>
            <MenuItem value="during">Negatory</MenuItem>
          </Select>

        </FormControl>
      }
    </>
  );
}

export default RsvpParking;