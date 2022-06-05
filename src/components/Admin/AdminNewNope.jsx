import React from 'react';
import AdminNewForm from './AdminNewForm';

function AdminNewNope() {

  return (
    <div className="container">

      {/* form to add a new guest */}
      {/* inputs: first name, last name, welcome message */}
      <AdminNewForm />      

      <h3>These people have already been noped:</h3>

    </div>
  );
}

export default AdminNewNope;