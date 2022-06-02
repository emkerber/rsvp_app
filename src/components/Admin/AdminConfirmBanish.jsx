import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminConfirmBanish() {
  const history = useHistory();
  const dispatch = useDispatch();
  const guest = useSelector(store => store.guest.guestDetails);

  const handleNevermindClick = () => {
    history.push(`/admin/guests/${guest.id}`);
  }

  const handleBanishClick = () => {

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

    </div>
  );
}

export default AdminConfirmBanish;