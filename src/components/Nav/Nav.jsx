import React from 'react';
import { useSelector } from 'react-redux';

import NavMenu from './NavMenu.jsx';

import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);
  const [openMenu, setOpenMenu] = React.useState(false);
  const prevOpenMenu = React.useRef(openMenu);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === 'Escape') {
      setOpenMenu(false);
    }
  }

  // return focus to the button when we transitioned from !openMenu -> openMenu
  React.useEffect(() => {
    if (prevOpenMenu.current === true && openMenu === false) {
      anchorRef.current.focus();
    }
    prevOpenMenu.current = openMenu;
  }, [openMenu]);

  return (
    <div className="nav">
      <h2 className="nav-title">BRINGOL</h2>
      <div>
        {/* If no user is logged in, show Back link to landing page */}
        {/* {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        } */}

        {/* If a user is logged in, show the nav menu */}
        {/* {user.id && (
          <NavMenu/>
        )} */}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
