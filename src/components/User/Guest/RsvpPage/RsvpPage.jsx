import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import RsvpAttending from './RsvpAttending';

import { FormControl, FormGroup, InputLabel, Input, Select, MenuItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './RsvpPage.css';

function RsvpPage() {
  const attending = useSelector(store => store.invite.responses.attending);

  return (
    <div className="container">
      
      <h1>RSVP</h1>

      {attending && 
        <p>
          <FavoriteIcon className="heart-small" />
          Provide all responses to see the Guest List!
          <FavoriteIcon className="heart-small" />
        </p>
      }

      <RsvpAttending />
    
    </div>
  );
}

export default RsvpPage;
