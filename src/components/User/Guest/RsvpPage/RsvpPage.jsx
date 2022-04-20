import React from 'react';

import RsvpAttending from './RsvpAttending';
import WelcomeMessage from './WelcomeMessage';
import RsvpAttendingDeets from './RsvpAttendingDeets';
import RsvpDietRestrictions from './RsvpDietRestrictions';

import './RsvpPage.css';

function RsvpPage() {

  return (
    <div className="container">
      
      <h1>RSVP</h1>

      <RsvpAttending />

      <WelcomeMessage />

      <RsvpAttendingDeets />

      <RsvpDietRestrictions />
    
    </div>
  );
}

export default RsvpPage;
