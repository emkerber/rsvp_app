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
import Snackbars from '../Snackbars/Snackbars';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedGuestRoute from './ProtectedRoute/ProtectedGuestRoute';
import ProtectedAdminRoute from './ProtectedRoute/ProtectedAdminRoute';

import ThankYouPage from '../User/ThankYouPage';
import RsvpPage from '../User/Guest/RsvpPage/RsvpPage';
import DeetsPage from '../User/Guest/DeetsPage';
import LandingPage from '../LandingPage/LandingPage';
import AuthenticatePage from '../Authenticate/AuthenticatePage';
import GuestGuestListPage from '../User/Guest/GuestGuestListPage';
import PendingPage from '../User/PendingPage';
import DeniedPage from '../User/DeniedPage';
import AdminGuestList from '../Admin/AdminGuestList/AdminGuestList';
import AdminGuestDetails from '../Admin/AdminGuestDetails/AdminGuestDetails';
import AdminConfirmBanish from '../Admin/AdminGuestDetails/AdminConfirmBanish';
import AdminResponses from '../Admin/AdminResponses/AdminResponses';
import AdminNewNope from '../Admin/AdminNewNope/AdminNewNope';
import AdminPending from '../Admin/AdminPending/AdminPending';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.userReducer);

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
                // redirect to the /rsvp page
                <Redirect to="/deets" />
                :
                // Otherwise, show the login/registration page
                <AuthenticatePage />
              }
            </Route>
            
            
            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/rsvp will show the RsvpPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the Landing Page (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/rsvp */}
            
            <ProtectedGuestRoute
              // logged in guest shows Rsvp page
              exact
              path="/rsvp"
            >
              <RsvpPage />
            </ProtectedGuestRoute>

            <ProtectedGuestRoute
              // logged in guest shows Deets (Details) page
              exact
              path="/deets"
            >
              <DeetsPage />
            </ProtectedGuestRoute>

            <ProtectedGuestRoute
              // logged in guest shows GuestGuestList page
              exact
              path="/guest-list"
            >
              <GuestGuestListPage />
            </ProtectedGuestRoute>

            <ProtectedAdminRoute
              // logged in shows AdminGuestList else shows LoginPage
              exact
              path="/admin/guests"
            >
              <AdminGuestList />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // logged in admin can access guest's details
              // by clicking their name on AdminGuestList
              exact
              path="/admin/guests/:id"
            >
              <AdminGuestDetails />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // clicking Banish button on guest's details page
              // brings user here to confirm
              exact
              path="/admin/guests/:id/banish"
            >
              <AdminConfirmBanish />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // link in nav
              // displays aggregated responses
              exact
              path="/admin/responses"
            >
              <AdminResponses />
            </ProtectedAdminRoute>

            <ProtectedAdminRoute
              // logged in shows Admin New / Nope else shows LoginPage
              // forms to add a guest and add someone who can't come
              exact
              path="/admin/new-nope"
            >
              <AdminNewNope />
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
              <ThankYouPage />
            </ProtectedRoute>

            <ProtectedRoute
              // after logging in as 'pending'
              exact
              path="/pending"
            >
              <PendingPage />
            </ProtectedRoute>

            <ProtectedRoute
              // after registering or logging in as 'nope'
              exact
              path="/nope"
            >
              <DeniedPage />
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
        <Snackbars />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
