import React from 'react';
import { useSelector } from 'react-redux';

import NavMenu from './NavMenu.jsx';

import './Nav.css';

function Nav() {
  const partyTitle = useSelector(store => store.party.title);
  const userId = useSelector(store => store.user.userReducer.id);

  return (
    <div className="nav">
      
      {/* super cool neon sign-effect logo */}
      <h2 className="nav-title">{partyTitle}</h2>
      
      {/* If a user is logged in, show the nav menu */}
      {userId && <NavMenu />}

    </div>
  );
}

export default Nav;
