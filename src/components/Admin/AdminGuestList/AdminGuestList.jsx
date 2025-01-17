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
  const notYetInvitedList = useSelector(store => store.guest.notYetInvitedList);

  return (
    <div className="container">

      {/* table with counts for each category */}
      <AdminGuestTotalsTable />

      <p>Click on a guest's name to see their details.</p>

      <h2>Attending</h2>
      <AdminGuestSubcategoryList list={attendingList} displaySentButton="False" />

      <h2>Might attend</h2>
      <AdminGuestSubcategoryList list={maybeList} displaySentButton="False" />

      <h2>Not attending</h2>
      <AdminGuestSubcategoryList list={notAttendingList} displaySentButton="False" />

      <h2>No response</h2>
      <AdminGuestSubcategoryList list={noResponseList} displaySentButton="False" />

      <h2>Not yet invited</h2>
      <AdminGuestSubcategoryList list={notYetInvitedList} displaySentButton="True" />

    </div>
  );
}

export default AdminGuestList;