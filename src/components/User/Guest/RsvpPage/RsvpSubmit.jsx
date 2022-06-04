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

    // if one or more of the duty options was selected
    // then save or update guest's duties
    if (rsvp.setupDuty || rsvp.cleanupDuty || rsvp.waterDuty || rsvp.photoDuty || rsvp.noDuty) {
      // if duties have previously been saved
      dutiesPrevIndicated ?
        // then update existing row
        dispatch({
          type: 'UPDATE_DUTY_RESPONSES',
          payload: rsvp
        })
      : // otherwise insert a new row
        dispatch({
          type: 'SAVE_DUTY_RESPONSES',
          payload: rsvp
        });
    }

    // show snackbar to notify user of success
    dispatch({
      type: 'RSVP_SAVED'
    });

    // go back to the Deets view
    history.push('/deets');
  } // end handleSubmitClick()

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