import React from 'react';
import { useSelector } from 'react-redux';

function DeetsPage() {
  const party = useSelector(store => store.party);

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
