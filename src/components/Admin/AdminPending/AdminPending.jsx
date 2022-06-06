import React from 'react';
import { useSelector } from 'react-redux';

import AdminPendingPerson from './AdminPendingPerson';

function AdminPending() {
  const pendingList = useSelector(store => store.pending.pendingList);

  return (
    <div className="container">
      
      <h2>Pending approval</h2>

      {/* list of names, each with an approve button and deny button */}
      {/* and a text input for welcome_message or denial_message */}
      {pendingList.map(person => (
        <AdminPendingPerson key={person.id} person={person} />
      ))}

    </div>
  );
}

export default AdminPending;