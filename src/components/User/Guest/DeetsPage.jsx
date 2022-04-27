import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DeetsPage() {
  const dispatch = useDispatch();
  const dutiesIndicated = useSelector(store => store.guest.responses.duties_indicated);
  const guestId = useSelector(store => store.guest.responses.id);

  useEffect(() => {
    dutiesIndicated &&
      dispatch({ type: 'FETCH_GUEST_DUTIES', payload: guestId });
  }, [dutiesIndicated]);

  return (
    <div className="container">
      <p>Deeeeets Page</p>
    </div>
  );
}

export default DeetsPage;
