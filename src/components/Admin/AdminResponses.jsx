import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AdminResponses() {
  const dispatch = useDispatch();

  // const dietaryRestrictions = useSelector(store => store.guest.dietaryRestrictions);
  // const parkingDuring = useSelector(store => store.guest.parkingDuring);
  // const parkingOvernight = useSelector(store => store.guest.parkingOvernight);
  // const additionalGuests = useSelector(store => store.guest.additionalGuests);
  // const dutySetup = useSelector(store => store.guest.dutySetup);
  // const dutyCleanup = useSelector(store => store.guest.dutyCleanup);
  // const dutyHydration = useSelector(store => store.guest.dutyHydration);
  // const dutyPhotography = useSelector(store => store.guest.dutyPhotography);
  // const dutyNone = useSelector(store => store.guest.dutyNone);
  // const questionsComments = useSelector(store => store.guest.questionsComments);

  useEffect(() => {
    // dispatch fetches for each response
  }, []);

  return (
    <div className="container">
      
      <p>Click on a guest's name to see their details.</p>

      <h2>Dietary Restrictions</h2>

      <h2>Parking</h2>
      <h3>During the party only</h3>
      <h3>Overnight</h3>

      <h2>Additional guests</h2>

      <h2>Duty signups</h2>
      <h3>Setup Squad</h3>
      <h3>Cleanup Crew</h3>
      <h3>Hydration Helper</h3>
      <h3>Photography Friend</h3>
      <h3>No thanks to all of those</h3>

      <h2>Questions / comments / concerns / compliments</h2>

    </div>
  );
}

export default AdminResponses;