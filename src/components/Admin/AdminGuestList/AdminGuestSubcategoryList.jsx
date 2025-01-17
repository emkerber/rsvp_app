import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { Button } from '@mui/material';
import './AdminGuestSubcategoryList.css';

function AdminGuestSubcategoryList({ list, displaySentButton }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePersonClick = (id) => {
    // get the specific guest's details
    dispatch({ type: 'FETCH_GUEST_DETAILS', payload: id });
    
    // and also get their duties
    dispatch({ type: 'FETCH_DUTY_DETAILS', payload: id });
    
    // go to the guest's details page
    history.push(`/admin/guests/${id}`);
  }

  // checks are not displayed for all renders of this component
  const handleSentClick = (id) => {
    dispatch({ type: 'UPDATE_INVITE_SENT', payload: id });
  }

  return (
    <div>
      {list.map(person => (

          <p key={person.id}>

            <span onClick={() => handlePersonClick(person.id)}>
              {person.first_name} {person.last_name}
            </span>

            {displaySentButton === "True" &&
              <button 
                class="small-button" 
                onClick={() => handleSentClick(person.id)}
              >✔</button>
            }

          </p>

      ))}
    </div>
  );
}

export default AdminGuestSubcategoryList;