import React from 'react';

import RsvpAttending from './RsvpAttending';
import RsvpWelcomeMessage from './RsvpWelcomeMessage';
import RsvpAttendingDeets from './RsvpAttendingDeets';
import RsvpDietRestrictions from './RsvpDietRestrictions';
import RsvpAdditionalGuests from './RsvpAdditionalGuests';
import RsvpParking from './RsvpParking';
import RsvpDuties from './RsvpDuties';

import './RsvpPage.css';

function RsvpPage() {

  return (
    <div className="container" id="rsvp-container">
      
      <h1>RSVP</h1>

      {/* Will you attend?! */}
      <RsvpAttending />

      {/* Hooray! Please provide all responses to access the Guest List! */}
      {/* or */}
      {/* Bummer!! Hope you can make it next year! */}
      <RsvpWelcomeMessage />
      {/* or */}
      {/* Care to elaborate? */}
      <RsvpAttendingDeets />

      {/* Any dietary restrictions? */}
      {/* Please elaborate! */}
      <RsvpDietRestrictions />

      {/* Planning to bring anyone? */}
      {/* Who? Please note their attendance must be approved! */}
      <RsvpAdditionalGuests />

      {/* Do you require vehicle parking? */}
      {/* Will you be parked overnight? */}
      <RsvpParking />

      {/* Are you interested in signing up for any of these extra special duties? */}
      <RsvpDuties />

    </div>
  );
}

export default RsvpPage;
