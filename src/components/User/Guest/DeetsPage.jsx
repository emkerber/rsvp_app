import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DeetsPage() {
  const dispatch = useDispatch();
  
  const party = useSelector(store => store.party);
  const allResponses = useSelector(store => store.guest.allResponsesExist);

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

    </div>
  );
}

export default DeetsPage;
