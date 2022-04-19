import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import RsvpAttending from './RsvpAttending';
import WelcomeMessage from './WelcomeMessage';

import { FormControl, FormGroup, InputLabel, Input, Select, MenuItem } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './RsvpPage.css';

function RsvpPage() {
  const responses = useSelector(store => store.invite.responses);

  return (
    <div className="container">
      
      <h1>RSVP</h1>

      <RsvpAttending />

      <WelcomeMessage />

      
    
    </div>
  );
}

export default RsvpPage;
