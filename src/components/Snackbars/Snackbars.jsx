import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';

function Snackbars() {
  const dispatch = useDispatch();
  const pendingEmailSaved = useSelector(store => store.snackbar.pendingEmailSaved);
  const rsvpSaved = useSelector(store => store.snackbar.rsvpSaved);
  
  return (
    <>
      
      {pendingEmailSaved &&
        <Snackbar 
          open={pendingEmailSaved}
          autoHideDuration={5000}
          onClose={() => dispatch({ type: 'PENDING_EMAIL_SAVED_CLOSE' })}
          message="Email saved!"
        />
      }
    
      {rsvpSaved &&
        <Snackbar 
          open={rsvpSaved}
          autoHideDuration={5000}
          onClose={() => dispatch({ type: 'RSVP_SAVED_CLOSE' })}
          message="Your responses are saved!"
        />
      }

    </>
  );
}

export default Snackbars;