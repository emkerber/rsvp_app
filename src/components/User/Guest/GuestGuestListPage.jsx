import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Guest.css';

function GuestGuestList() {
  const dispatch = useDispatch();
  const list = useSelector(store => store.guest.guestsList);

  useEffect(() => {
    dispatch({ type: 'FETCH_GUESTS_LIST' });
  }, []);
  
  return (
    <div className="container">
      
      <h2 id="guest-guest-list-h2">The Guest List</h2>

      <ul id="guest-guest-list-ul">
        {list.map((guest, i) => (
          <li key={i}>{guest.guest}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default GuestGuestList;