import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WelcomeMessage() {
  const attendingBool = useSelector(store => store.rsvp.attendingBool);
  const welcomeMessage = useSelector(store => store.invite.responses.welcome_message);

  return (
    <>
      {attendingBool && 
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