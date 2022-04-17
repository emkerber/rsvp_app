import React from 'react';
import { useSelector } from 'react-redux';

function Denied() {
  const denialMessage = useSelector(store => store.invite.responses.denial_message);
  
  return (
    <div className="container">
      <h1>Admittance denied.</h1>
      {denialMessage && 
        <p>{denialMessage}</p>
      }
    </div>
  );
}

export default Denied;