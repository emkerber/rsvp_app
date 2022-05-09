import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';

function Snackbars() {
  const dispatch = useDispatch();
  const pendingEmailSaved = useSelector(store => store.snackbar.pendingEmailSaved);
  
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
    
    </>
  );
}

export default Snackbars;