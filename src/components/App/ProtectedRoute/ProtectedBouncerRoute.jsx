import React from 'react';
import { Route } from 'react-router-dom';
import {useSelector} from 'react-redux';

import LandingPage from '../../LandingPage/LandingPage';

function ProtectedBouncerRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user.userReducer);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedBouncerComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.access_level === 1 ?
        // If the logged in user is a bouncer, show the protected bouncer component
        <ProtectedBouncerComponent />
        :
        // Otherwise, redirect to the Landing Page
        <LandingPage />
      }
    </Route>

  );
}

export default ProtectedBouncerRoute;
