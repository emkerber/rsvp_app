import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function AdminGuestDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const guest = useSelector(store => store.guest.guestDetails);

  const handleBackClick = () => {
    dispatch({ type: 'UNSET_GUEST_DETAILS' });
    history.push('/admin/guests');
  }

  const handleBanishClick = () => {
    history.push(`/admin/guests/${guest.id}/banish`);
  }

  const determineStatus = () => {
    switch (guest?.attending_code) {
      case 'YAY':
        return <h3>Attending</h3>;
      case 'TBD':
        return <h3>Maybe attending</h3>;
      case 'NAY':
        return <h3>Not attending</h3>;
      default:
        return <h3>No response</h3>;
    }
  }

  return (
    <div className="container">
      
      {/* back button to admin guest list */}
      <Button
        variant="contained"
        onClick={handleBackClick}
      >
        Back
      </Button>

      {/* first and last names */}
      <h2>{guest?.first_name} {guest?.last_name}</h2>

      {/* Attending / Maybe attending / Not attending / No response */}
      {determineStatus()}

      {/* questions/comments/concerns */}
      {guest?.questions_comments && <p>{guest.first_name} says: {guest.questions_comments}</p>}

      {/* if they're a Maybe and they provided more info */}
      {guest?.attending_deets && <p>Attendance deets: {guest.attending_deets}</p>}

      {/* info regarding people they plan to bring */}
      {guest?.additional_guests && <p>Additional guest info: {guest.additional_guests}</p>}

      {/* dietary restriction info */}
      {guest?.dietary_restrictions && <p>Dietary restrictions: {guest.dietary_restrictions}</p>}

      {/* parking needs */}
      {guest?.parking && <p>Parking: {guest.parking}</p>}

      {/* TODO duties */}

      {/* their unique welcome message */}
      {guest?.welcome_message && <p>Welcome message: {guest.welcome_message}</p>}

      {/* guest's email */}
      {guest?.email && <p>Email: {guest.email}</p>}

      {/* to remove guest from guest list */}
      {/* and add to pending list as resolved */}
      {/* takes user to separate confirmation view */}
      <Button
        variant="contained"
        onClick={handleBanishClick}
      >
        Banish
      </Button>

    </div>
  );
}

export default AdminGuestDetails;