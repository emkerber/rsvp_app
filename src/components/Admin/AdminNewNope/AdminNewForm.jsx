import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';

function AdminNewForm() {
  const dispatch = useDispatch();

  const partyId = useSelector(store => store.party.id);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleSubmitClick = () => {
    // save the guest to the guests table
    dispatch({
      type: 'ADD_GUEST',
      payload: { firstName, lastName, welcomeMessage, partyId }
    });

    // clear the form inputs
    setFirstName('');
    setLastName('');
    setWelcomeMessage('');
  }

  return (
    <div className="admin-form">

      {/* form to add a guest to the guest list */}
      <FormControl>
      
        <h2>Add a Guest</h2>
        
        <TextField 
          placeholder="First name"
          className="input"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          placeholder="Last name"
          className="input"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <TextField
          placeholder="Welcome message"
          multiline
          rows={2}
          className="input"
          value={welcomeMessage}
          onChange={(event) => setWelcomeMessage(event.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>

      </FormControl>

    </div>
  );
}

export default AdminNewForm;