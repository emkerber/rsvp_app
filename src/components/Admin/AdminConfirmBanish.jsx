import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function AdminConfirmBanish() {
  const history = useHistory();
  const dispatch = useDispatch();

  const guest = useSelector(store => store.guest.guestDetails);

  const [isBanished, setIsBanished] = useState(false);
  const [explanation, setExplanation] = useState('');

  const handleNevermindClick = () => {
    // return to the guest's details
    history.push(`/admin/guests/${guest.id}`);
  }

  const handleBanishClick = () => {
    // display a text input for pendings.denial_message
    // and a button for final confirmation
    setIsBanished(true);
  }

  const handleByeClick = () => {
    // send guest's id to guest saga
    // saga will delete from duties then guests
    dispatch({ type: 'BANISH_GUEST', payload: guest.id });

    // send guest's info and explanation to pending saga
    // saga will insert into pendings
    dispatch({ type: 'ADD_BANISHED', payload: { guest, explanation }});
    
    // return to admin guest list
    history.push('/admin/guests');
  }

  return (
    <div className="container">
      
      <h2>Are you sure you want to banish this guest?</h2>
      
      <Button
        variant="contained"
        onClick={handleNevermindClick}
      >
        Nevermind
      </Button>

      <Button
        variant="contained"
        onClick={handleBanishClick}
      >
        Banish them!
      </Button>

      {/* if the Banish button has been clicked, */}
      {/* display text input and final confirmation button */}
      {isBanished &&
        <div>
          
          <h3>You may provide them an explanation.</h3>
          
          <TextField
            multiline
            rows={4}
            value={explanation}
            onChange={event => setExplanation(event.target.value)}
          >
          </TextField>

          <Button
            variant="contained"
            onClick={handleByeClick}
          >
            BYE
          </Button>

        </div>
      }

    </div>
  );
}

export default AdminConfirmBanish;