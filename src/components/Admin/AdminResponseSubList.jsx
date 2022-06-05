import React from 'react';

function AdminResponseSubList({ list }) {

  const handlePersonClick = (id) => {
    // get the specific guest's details
    dispatch({ type: 'FETCH_GUEST_DETAILS', payload: id });
    
    // and also get their duties
    dispatch({ type: 'FETCH_DUTY_DETAILS', payload: id });
    
    // go to the guest's details page
    history.push(`/admin/guests/${id}`);
  }
  
  return (
    <ul className="admin-response-list">
      {list.map(person => (
        <li 
          key={person.id}
          onClick={() => handlePersonClick(person.id)}
        >
          {person.first_name} {person.last_name}{person.details && ':'} {person.details}
        </li>
      ))}
    </ul>
  )
}

export default AdminResponseSubList;