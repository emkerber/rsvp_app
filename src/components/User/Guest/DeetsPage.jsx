import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import './Guest.css';

function DeetsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const party = useSelector(store => store.party);
  const allResponses = useSelector(store => store.guest.allResponsesExist);

  const handleRsvpClicked = () => {
    history.push('/rsvp');
  }

  useEffect(() => {
    allResponses && dispatch({ type: 'FETCH_GUESTS_LIST' });
  }, []);

  return (
    <div className="container deets-container">
      
      <h2>{party.description}</h2>

      <div className="when-where">
        <p>{party.pretty_date}</p>
        <p>{party.time}</p>
        <p>{party.location}</p>  
      </div>
  
      <p>{party.description_two}</p>

      <p>{party.parking_info}</p>

      <div id="go-to-rsvp-btn">
        <Button
          variant="contained"
          onClick={handleRsvpClicked}
        >
          RSVP!
        </Button>
      </div>

    </div>
  );
}

export default DeetsPage;
