import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, Input, Select } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function RsvpForm() {
  const responses = useSelector(store => store.invite.responses);

  // intermediary state vars 
  // for determining what's rendered / saved
  const [helperAttending, setHelperAttending] = useState('');

  // display the existing responses on the DOM
  // send these values back to the db
  const [email, setEmail] = useState(responses.email);
  const [attending, setAttending] = useState(responses.attending);

  const handleAttendingChange = (event) => {
    switch (event.target.value) {
      case 'Yes':
        setAttending(false);
        break;
      case 'Maybe':
        setAttending(false);
        break;
      case 'No':
        setAttending(false);
        break;
    }
  }

  return (
    <div>
      <FormControl>
        {attending && 
          <p>Provide all responses to see the Guest List <FavoriteIcon className="heart" /></p>
        }
        <h2>Will you attend?!</h2>
        <Select
          id="select-attending"
          value={helperAttending}
          label="Attending?"
          onChange={handleAttendingChange}
        >
        </Select>

        
        <Input 
          id="input-email" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}>
        </Input>


      </FormControl>
    </div>
  )
};

export default RsvpForm;

// attending
// perhaps_attending
// dietary_restrictions
// additional_guests
