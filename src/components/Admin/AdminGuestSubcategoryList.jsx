import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminGuestSubcategoryList({ list }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // get the guest's details and go to Details page
  const handlePersonClick = (id) => {
    dispatch({ type: 'FETCH_GUEST_DETAILS', payload: id });
    // history.push(`/admin/guests/${id}`);
  }

  return (
    <div>
      {list.map(person => (
        <p key={person.id} onClick={() => handlePersonClick(person.id)}>
          {person.first_name} {person.last_name}
        </p>
      ))}
    </div>
  );
}

export default AdminGuestSubcategoryList;