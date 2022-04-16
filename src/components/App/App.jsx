import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import IdleTimer from 'react-idle-timer';

import { Paper } from '@mui/material';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from '../ProtectedRoute/ProtectedAdminRoute';

import ThankYou from '../ThankYou/ThankYou';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import AuthenticatePage from '../AuthenticatePage/AuthenticatePage';
import GuestGuestList from '../GuestGuestList/GuestGuestList';
import Pending from '../Pending/Pending';
import Denied from '../Denied/Denied';
import AdminGuestList from '../AdminGuestList/AdminGuestList';
import AdminAddRemove from '../AdminAddRemove/AdminAddRemove';
import AdminPending from '../AdminPending/AdminPending';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  // when the user has been idle for 15 minutes
  // log them out and clear reducers
  const handleOnIdle = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <IdleTimer 
          timeout={1000 * 60 * 15}
          onIdle={handleOnIdle}
          debounce={250}
        />
        <Nav />
        <Paper className="paper-container" elevation={6}>
          <Switch>

            <Route
              exact
              path="/"
            >
              <LandingPage />
            </Route>

            <Route
              exact
              path="/authenticate"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login/registration page
                <AuthenticatePage />
              }
            </Route>
            
            
            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the Landing Page (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            
            <ProtectedRoute
              // logged in shows UserPage else shows Landing Page
              // UserPage shows RSVP form
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows Landing Page
              exact
              path="/deets" // formerly "info"
            >
              <InfoPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows GuestGuestList else shows Landing Page
              exact
              path="/guest-list" // formerly "list"
            >
              <GuestGuestList />
            </ProtectedRoute>

            <ProtectedAdminRoute
              // logged in shows AdminGuestList else shows LoginPage
              exact
              path="/admin/guests"
            >
              <AdminGuestList />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // logged in shows AdminAddRemove else shows LoginPage
              exact
              path="/admin/new-nope" // formerly "edit"
            >
              <AdminAddRemove />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // logged in shows AdminPending else shows LoginPage
              exact
              path="/admin/pending" // formerly "approve"
            >
              <AdminPending />
            </ProtectedAdminRoute>

            {/* non-guests */}
            <ProtectedRoute
              // after registering as 'none'
              exact
              path="/thanks"
            >
              <ThankYou />
            </ProtectedRoute>

            <ProtectedRoute
              // after logging in as 'pending'
              exact
              path="/pending"
            >
              <Pending />
            </ProtectedRoute>

            <ProtectedRoute
              // after registering or logging in as 'nope'
              exact
              path="/nope"
            >
              <Denied />
            </ProtectedRoute>

            {/* If none of the other routes matched, 
            we will show the Landing Page, 
            with a subtle "404" above it. */}
            <Route>
              <p>404</p>
              <LandingPage />
            </Route>

          </Switch>
        </Paper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
