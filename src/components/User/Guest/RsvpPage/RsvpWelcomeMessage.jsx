// if guest indicates they're attending, 
// then render their welcome_message and prompt to provide all responses
// if they're not attending
// then render a bummer message
import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WelcomeMessage() {
  const attendingCode = useSelector(store => store.rsvp.attendingCode);
  const welcomeMessage = useSelector(store => store.invite.responses.welcome_message);

  return (
    <>
      {attendingCode === 'YAY' && 
        <div id="welcome-message">
          <p>{welcomeMessage}</p>
          <p>
            <FavoriteIcon className="heart-small" />
            Provide all responses to see the Guest List!
            <FavoriteIcon className="heart-small" />
          </p>
        </div>
      }

      {attendingCode === 'NAY' &&
        <div id="bummer-message">
          <p>Bummer!! Hope you can make it next year!</p>
        </div>
      }
    </>
  )
}

export default WelcomeMessage;