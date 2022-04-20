import React from 'react';

import RsvpAttending from './RsvpAttending';
import WelcomeMessage from './WelcomeMessage';
import RsvpAttendingDeets from './RsvpAttendingDeets';

import './RsvpPage.css';

function RsvpPage() {

  return (
    <div className="container">
      
      <h1>RSVP</h1>

      <RsvpAttending />

      <WelcomeMessage />

      <RsvpAttendingDeets />
    
    </div>
  );
}

export default RsvpPage;
