import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Paper } from '@mui/material';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Paper className="paper-container" elevation={6}>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            
            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows GuestGuestList else shows LoginPage
              exact
              path="/list"
            >
              <GuestGuestList />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminGuestList else shows LoginPage
              exact
              path="/admin/guests"
            >
              <AdminGuestList />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminAddRemove else shows LoginPage
              exact
              path="/admin/edit"
            >
              <AdminAddRemove />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminPending else shows LoginPage
              exact
              path="/admin/approve"
            >
              <AdminPending />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Pending else shows LoginPage
              exact
              path="/pending"
            >
              <Pending />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows Denied else shows LoginPage
              exact
              path="/nope"
            >
              <Denied />
            </ProtectedRoute>

            {/* Visiting localhost:3000/thanks will show the ThankYou page. */}
            <Route
              // shows ThankYou at all times (logged in or not)
              exact
              path="/thanks"
            >
              <ThankYou />
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

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>Four oh four.</h1>
            </Route>

          </Switch>
        </Paper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
