import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';

function PendingPhone() {
  const dispatch = useDispatch();
  const phoneInfo = useSelector(store => store.pending.info.phone);
  const idInfo = useSelector(store => store.pending.info.id);
  const userId = useSelector(store => store.user.userReducer.id);
  
  const [phone, setPhone] = useState('');

  const handleSubmitClick = () => {
    // send phone to the pending saga
    // also send userId, for fetching fresh results
    dispatch({
      type: 'UPDATE_PENDING_PHONE',
      payload: {idInfo, phone, userId}
    });

    // show snackbar to notify user of success
    dispatch({
      type: 'PENDING_PHONE_SAVED'
    });
  }
  
  return (
    <>
      {/* don't show if user's phone is already saved */}
      {!phoneInfo &&
        <FormControl>

          <p>Please enter your phone number to receive updates!</p>
    
          <TextField 
            className="input"
            type="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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

export default PendingPhone;