import React from 'react';

import RsvpAttending from './RsvpAttending';
import WelcomeMessage from './WelcomeMessage';

import './RsvpPage.css';

function RsvpPage() {

  return (
    <div className="container">
      
      <h1>RSVP</h1>

      <RsvpAttending />

      <WelcomeMessage />

      
    
    </div>
  );
}

export default RsvpPage;
