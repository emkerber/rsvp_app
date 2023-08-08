import React from 'react';
import { Route } from 'react-router-dom';
import {useSelector} from 'react-redux';

import LandingPage from '../../LandingPage/LandingPage';

// this did not come pre-built, I made it!

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedAdminRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user.userReducer);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedAdminComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.access_level === 2 ?
        // If the logged in user is an admin, show the protected admin component
        <ProtectedAdminComponent />
        :
        // Otherwise, redirect to the Landing Page
        <LandingPage />
      }
    </Route>

  );
}

export default ProtectedAdminRoute;
