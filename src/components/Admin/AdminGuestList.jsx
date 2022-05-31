import React from 'react';
import AdminGuestTotalsTable from './AdminGuestTotalsTable';

function AdminGuestList() {
  return (
    <div className="container">
      
      {/* table with counts for each category */}
      <AdminGuestTotalsTable />

      <p>Click on a guest's name to see their details.</p>

      <h2>Attending</h2>

      <h2>Might attend</h2>

      <h2>Not attending</h2>

      <h2>No response</h2>

    </div>
  );
}

export default AdminGuestList;