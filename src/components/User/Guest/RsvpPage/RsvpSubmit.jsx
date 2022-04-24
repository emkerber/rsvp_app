import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

function RsvpSubmit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rsvp = useSelector(store => store.rsvp);

  const handleSubmitClick = () => {
    // send all rsvp responses to the guest saga
    dispatch({
      type: 'UPDATE_GUEST_RESPONSES',
      payload: rsvp
    });

    history.push('/deets');
  }

  return (
    <Button
      variant="contained"
      onClick={handleSubmitClick}
    >
      Submit!
    </Button>
  );
}

export default RsvpSubmit;