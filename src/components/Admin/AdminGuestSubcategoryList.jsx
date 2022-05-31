import React from 'react';

function AdminGuestSubcategoryList({ list }) {
  return (
    <div>
      {list.map(person => (
        <p>{person.first_name} {person.last_name}</p>
      ))}
    </div>
  );
}

export default AdminGuestSubcategoryList;