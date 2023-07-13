import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';

function PendingEmail() {
  const dispatch = useDispatch();
  const emailInfo = useSelector(store => store.pending.info.email);
  const idInfo = useSelector(store => store.pending.info.id);
  const userId = useSelector(store => store.user.userReducer.id);
  
  const [email, setEmail] = useState('');

  const handleSubmitClick = () => {
    // send email to the pending saga
    // also send userId, for fetching fresh results
    dispatch({
      type: 'UPDATE_PENDING_EMAIL',
      payload: {idInfo, email, userId}
    });

    // show snackbar to notify user of success
    dispatch({
      type: 'PENDING_EMAIL_SAVED'
    });
  }
  
  return (
    <>
      {/* don't show if user's email is already saved */}
      {!emailInfo &&
        <FormControl>

          <p>Please enter your email if you would like to receive updates.</p>
    
          <TextField 
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
    
          <Button 
            variant="contained"
            onClick={handleSubmitClick}
          >
            Submit  
          </Button>
    
        </FormControl>
      }
    </>
  );
}

export default PendingEmail;