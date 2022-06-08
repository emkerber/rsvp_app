import React from 'react';
import { useSelector } from 'react-redux';
import AdminGuestTotalsTable from './AdminGuestTotalsTable';
import AdminGuestSubcategoryList from './AdminGuestSubcategoryList';
import '../Admin.css';

function AdminGuestList() {
  const attendingList = useSelector(store => store.guest.attendingList);
  const maybeList = useSelector(store => store.guest.maybeList);
  const notAttendingList = useSelector(store => store.guest.notAttendingList);
  const noResponseList = useSelector(store => store.guest.noResponseList);

  return (
    <div className="container">

      {/* table with counts for each category */}
      <AdminGuestTotalsTable />

      <p>Click on a guest's name to see their details.</p>

      <h2>Attending</h2>
      <AdminGuestSubcategoryList list={attendingList} />

      <h2>Might attend</h2>
      <AdminGuestSubcategoryList list={maybeList} />

      <h2>Not attending</h2>
      <AdminGuestSubcategoryList list={notAttendingList} />

      <h2>No response</h2>
      <AdminGuestSubcategoryList list={noResponseList} />

    </div>
  );
}

export default AdminGuestList;