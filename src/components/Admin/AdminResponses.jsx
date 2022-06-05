import React from 'react';
import { useSelector } from 'react-redux';

import AdminResponseSubList from './AdminResponseSubList';

function AdminResponses() {
  // data fetched on admin login
  const dietaryRestrictions = useSelector(store => store.guest.dietaryRestrictions);
  const parkingDuring = useSelector(store => store.guest.parkingDuring);
  const parkingOvernight = useSelector(store => store.guest.parkingOvernight);
  const additionalGuests = useSelector(store => store.guest.additionalGuests);
  const volunteersSetup = useSelector(store => store.duties.volunteersSetup);
  const volunteersCleanup = useSelector(store => store.duties.volunteersCleanup);
  const volunteersHydration = useSelector(store => store.duties.volunteersHydration);
  const volunteersPhotography = useSelector(store => store.duties.volunteersPhotography);
  const volunteersNone = useSelector(store => store.duties.volunteersNone);
  const questionsComments = useSelector(store => store.guest.questionsComments);


  return (
    <div className="container">
      
      <p>Click on a guest's name to see their details.</p>

      <h2>Dietary Restrictions</h2>
      <AdminResponseSubList list={dietaryRestrictions} />

      <h2>Parking</h2>
      <h3>During the party only</h3>
      <AdminResponseSubList list={parkingDuring} />
      <h3>Overnight</h3>
      <AdminResponseSubList list={parkingOvernight} />

      <h2>Additional guests</h2>
      <AdminResponseSubList list={additionalGuests} />

      <h2>Volunteers</h2>
      <h3>Setup Squad</h3>
      <AdminResponseSubList list={volunteersSetup} />
      <h3>Cleanup Crew</h3>
      <AdminResponseSubList list={volunteersCleanup} />
      <h3>Hydration Helper</h3>
      <AdminResponseSubList list={volunteersHydration} />
      <h3>Photography Friend</h3>
      <AdminResponseSubList list={volunteersPhotography} />
      <h3>No thanks to all of those</h3>
      <AdminResponseSubList list={volunteersNone} />

      <h2>Questions / comments / concerns / compliments</h2>
      <AdminResponseSubList list={questionsComments} />

    </div>
  );
}

export default AdminResponses;