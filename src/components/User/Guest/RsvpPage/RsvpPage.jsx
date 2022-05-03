import React from 'react';
import { useSelector } from 'react-redux';

import RsvpAttending from './RsvpAttending';
import RsvpWelcomeMessage from './RsvpWelcomeMessage';
import RsvpAttendingDeets from './RsvpAttendingDeets';
import RsvpBummerMessage from './RsvpBummerMessage';
import RsvpEmail from './RsvpEmail';
import RsvpDietRestrictions from './RsvpDietRestrictions';
import RsvpAdditionalGuests from './RsvpAdditionalGuests';
import RsvpParking from './RsvpParking';
import RsvpDuties from './RsvpDuties';
import RsvpQuestionsComments from './RsvpQuestionsComments';
import RsvpSubmit from './RsvpSubmit';

import './RsvpPage.css';

function RsvpPage() {
  const attendingCode = useSelector(store => store.rsvp.attendingCode);

  return (
    <div className="container" id="rsvp-container">
      
      <h1>RSVP</h1>

      {/* Will you attend?! */}
      <RsvpAttending />

      {attendingCode === 'NAY' &&
        // Bummer!! Hope you can make it next year!
        <RsvpBummerMessage />
      }

      {attendingCode === 'TBD' &&
        <>
          {/* Care to elaborate? */}
          <RsvpAttendingDeets />

          {/* submit button PUTs either just the attending deets or all the things */}
          <RsvpSubmit />
        </>
      }

      {attendingCode === 'YAY' &&
        <>
          {/* Custom welcome message */}
          {/* Hooray! Please provide all responses to access the Guest List! */}
          <RsvpWelcomeMessage />

          {/* Please enter your email to receive party updates! */}
          <RsvpEmail />

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

          {/* Questions/comments/concerns/compliments? */}
          <RsvpQuestionsComments />

          {/* submit button PUTs either just the attending deets or all the things */}
          <RsvpSubmit />
        </>
      }

    </div>
  );
}

export default RsvpPage;
