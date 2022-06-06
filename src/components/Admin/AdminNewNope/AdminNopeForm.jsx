import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, TextField, Button } from '@mui/material';

function AdminNopeForm() {
  const dispatch = useDispatch();

  const partyId = useSelector(store => store.party.id);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [denialMessage, setDenialMessage] = useState('');

  const handleSubmitClick = () => {
    // save the person to the pendings table
    dispatch({
      type: 'ADD_NOPE',
      payload: { firstName, lastName, denialMessage, partyId }
    });

    // clear the form inputs
    setFirstName('');
    setLastName('');
    setDenialMessage('');
  }

  return (
    <div className="admin-form">

      {/* form to add a person who is definitely not invited */}
      <FormControl>

        <h2>Add a Person Who Definitely Can't Come</h2>

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
          placeholder="Denial message"
          multiline
          rows={2}
          className="input"
          value={denialMessage}
          onChange={(event) => setDenialMessage(event.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>

      </FormControl>

    </div>
  )
}

export default AdminNopeForm;