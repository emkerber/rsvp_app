// if guest indicates they're attending, 
// then render their welcome_message and prompt to provide all responses
// if they're not attending
// then render a bummer message
import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WelcomeMessage() {
  const welcomeMessage = useSelector(store => store.invite.responses.welcome_message);

  return (
    <div id="welcome-message">
      <p>{welcomeMessage}</p>
      <p>
        <FavoriteIcon className="heart-small" />
        Provide all responses to access the Guest List!
        <FavoriteIcon className="heart-small" />
      </p>
    </div>
  )
}

export default WelcomeMessage;