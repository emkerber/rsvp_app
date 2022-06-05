import React from 'react';
import AdminNewForm from './AdminNewForm';
import AdminNopeForm from './AdminNopeForm';

function AdminNewNope() {

  return (
    <div className="container">

      {/* form to add a new guest */}
      {/* inputs: first name, last name, welcome message */}
      <AdminNewForm />

      {/* form to add a new person who's definitely not invited */}
      {/* inputs: first name, last name, denial message */}
      <AdminNopeForm />

      <h3>Those who have already been noped:</h3>

    </div>
  );
}

export default AdminNewNope;