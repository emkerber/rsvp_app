import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import './Guest.css';

function DeetsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const party = useSelector(store => store.party);
  const allResponsesExist = useSelector(store => store.guest.allResponsesExist);

  const handleRsvpClicked = () => {
    history.push('/rsvp');
  }

  const handleGuestListClicked = () => {
    history.push('/guest-list');
  }

  useEffect(() => {
    allResponsesExist && dispatch({ type: 'FETCH_GUESTS_LIST' });
  }, []);

  return (
    <div className="container deets-container">
      
      <h2>{party.description}</h2>

      <div className="when-where">
        <p>
          {party.date}
          <br />
          {party.time}
        </p>
        <p>
          {party.location_name}
          <br />
          {allResponsesExist ? party.street_address : "(RSVP to reveal address)"}
          <br />
          {party.city_state}
          <span> {allResponsesExist && party.zip}</span>
        </p>
      </div>
  
      <p>{party.description_two}</p>

      <p>{party.parking_info}</p>

      <div id="deets-bottom-btns">
        <Button
          variant="contained"
          onClick={handleRsvpClicked}
        >
          RSVP!
        </Button>

        {/* if allResponsesExist then render button to the Guest Guest List */}
        {allResponsesExist &&
          <Button
            variant="contained"
            onClick={handleGuestListClicked}
          >
            Guest List
          </Button>
        }
      </div>

    </div>
  );
}

export default DeetsPage;
