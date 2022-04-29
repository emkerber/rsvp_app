import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

function RsvpSubmit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rsvp = useSelector(store => store.rsvp);
  const dutiesPrevIndicated = useSelector(store => store.guest.responses.duties_indicated);

  const handleSubmitClick = () => {
    // send all rsvp responses to the guest saga
    dispatch({
      type: 'UPDATE_GUEST_RESPONSES',
      payload: rsvp
    });

    // if duties have previously been saved
    dutiesPrevIndicated ?
      // then update existing row
      dispatch({
        type: 'UPDATE_GUEST_DUTIES',
        payload: rsvp
      })
    : // otherwise insert a new row
      dispatch({
        type: 'SAVE_GUEST_DUTIES',
        payload: rsvp
      });

    // go back to the Deets view
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