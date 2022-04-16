import React from 'react';
import { useSelector } from 'react-redux';

import NavMenu from './NavMenu.jsx';

import './Nav.css';

function Nav() {
  const user_id = useSelector((store) => store.user.id);

  return (
    <div className="nav">
      
      {/* super cool neon sign-effect logo */}
      <h2 className="nav-title">BRINGOL</h2>
      
      {/* If a user is logged in, show the nav menu */}
      {user_id && <NavMenu />}

    </div>
  );
}

export default Nav;
