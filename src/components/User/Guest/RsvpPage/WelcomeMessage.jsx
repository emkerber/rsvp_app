import React from 'react';
import { useSelector } from 'react-redux';

function WelcomeMessage() {
  const attendingTemp = useSelector(store => store.rsvp.attendingTemp);
  const welcomeMessage = useSelector(store => store.invite.responses.welcome_message);

  return (
    <>
      {attendingTemp === 'YAY' && 
        <div id="welcome-message">
          <p>{welcomeMessage}</p>
          <p>
            <FavoriteIcon className="heart-small" />
            Provide all responses to see the Guest List!
            <FavoriteIcon className="heart-small" />
          </p>
        </div>
      }
    </>
  )
}

export default WelcomeMessage;