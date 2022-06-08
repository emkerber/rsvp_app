import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import './Snackbars.css'; 

function Snackbars() {
  const dispatch = useDispatch();

  // pending user submits their email
  const pendingEmailSaved = useSelector(store => store.snackbar.pendingEmailSaved);

  // guest saves their rsvp responses
  const rsvpSaved = useSelector(store => store.snackbar.rsvpSaved);

  // admin submits a new guest
  const newGuestSaved = useSelector(store => store.snackbar.newGuestSaved);

  // admin submits a new nope
  const newNopeSaved = useSelector(store => store.snackbar.newNopeSaved);

  
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

      {newGuestSaved &&
        <Snackbar 
          open={newGuestSaved}
          autoHideDuration={5000}
          onClose={() => dispatch({ type: 'NEW_GUEST_SAVED_CLOSE' })}
          message="Guest added!"
        />
      }

      {newNopeSaved &&
        <Snackbar 
          open={newNopeSaved}
          autoHideDuration={5000}
          onClose={() => dispatch({ type: 'SEW_NOPE_SAVED_CLOSE' })}
          message="They have been added. They are noped."
        />
      }

    </>
  );
}

export default Snackbars;