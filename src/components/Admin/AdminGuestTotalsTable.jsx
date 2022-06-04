import React from 'react';
import { useSelector } from 'react-redux';

function AdminGuestTotalsTable() {
  const attendingList = useSelector(store => store.guest.attendingList);
  const maybeList = useSelector(store => store.guest.maybeList);
  const notAttendingList = useSelector(store => store.guest.notAttendingList);
  const noResponseList = useSelector(store => store.guest.noResponseList);

  return (
    <table id="admin-guest-totals">
      
      <thead>
        <tr>
          <th>Attending</th>
          <th>Maybe</th>
          <th>Can't</th>
          <th>NR</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{attendingList.length}</td>
          <td>{maybeList.length}</td>
          <td>{notAttendingList.length}</td>
          <td>{noResponseList.length}</td>
        </tr>
      </tbody>
      
    </table>
  );
}

export default AdminGuestTotalsTable;