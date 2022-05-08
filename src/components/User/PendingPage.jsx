import React from 'react';
import PendingEmail from './PendingEmail';

function Pending() {
  return (
    <div className="container">
      
      <h2>Your status is pending.</h2>
      
      <p>Thank you for your patience!</p>

      <PendingEmail />

    </div>
  );
}

export default Pending;