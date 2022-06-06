import React from 'react';
import AdminNewForm from './AdminNewForm';
import AdminNopeForm from './AdminNopeForm';
import AdminNopeList from './AdminNopeList';

function AdminNewNope() {

  return (
    <div className="container">

      {/* form to add a new guest */}
      {/* inputs: first name, last name, welcome message */}
      <AdminNewForm />

      {/* form to add a new person who's definitely not invited */}
      {/* inputs: first name, last name, denial message */}
      <AdminNopeForm />

      {/* list of people who have been noped */}
      <AdminNopeList />

    </div>
  );
}

export default AdminNewNope;