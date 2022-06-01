import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminGuestDetails() {
  const history = useHistory();
  const guestDetails = useSelector(store => store.guest.guestDetails);

  const handleBackClick = () => {
    console.log('back!');
  }
  
  return (
    <div className="container">
      <h2>Deets!</h2>
      
      <Button
        variant="contained"
        onClick={handleBackClick}
      >
        Back
      </Button>

    </div>
  );
}

export default AdminGuestDetails;