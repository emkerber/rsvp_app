import React from 'react';
import { useSelector } from 'react-redux';

function AdminNopeList() {
  const nopeList = useSelector(store => store.pending.nopeList);

  return (
    <div className="admin-list">
      
      <h2>The following have already been noped:</h2>

      <ul>
        {nopeList.map(person => (
          <li key={person.id}>{person.first_name} {person.last_name}</li>
        ))}
      </ul>

    </div>
  );
}

export default AdminNopeList;