import React from 'react';
import { useSelector } from 'react-redux';
import './User.css';

function Denied() {
  const denialMessage = useSelector(store => store.pending.info.denial_message);
  
  return (
    <div className="container">
      <h1>Admittance denied.</h1>
      {denialMessage && 
        <p id="denial-message">
          {denialMessage}
        </p>
      }
    </div>
  );
}

export default Denied;