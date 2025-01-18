import React from 'react';
import PendingPhone from './PendingPhone';

function Pending() {
  return (
    <div className="container">
      
      <h2>Your status is pending.</h2>
      
      <p>Thank you for your patience!</p>

      {/* no longer collecting phone numbers */}
      {/* <PendingPhone /> */}

    </div>
  );
}

export default Pending;