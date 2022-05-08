import React from 'react';
import PendingEmail from './PendingEmail';

function ThankYou() {
  return (
    <div className="container">
      
      <h1>Thanks!</h1>
      
      <p>Your application for party attendance will be reviewed!</p>
      
      <PendingEmail />
      
    </div>
  );
}

export default ThankYou;
