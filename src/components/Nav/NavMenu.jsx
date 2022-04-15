import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Menu,
  MenuItem,
} from '@mui/material';

import './NavMenu.css';

function NavMenu() {
  // https://mui.com/components/menus/

  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setAnchorEl(false);
    } else if (event.key === 'Escape') {
      setAnchorEl(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  return (
    <>

        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>

      <div>
        <Button
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          onClickAway={handleClose}
        >
          Dashboard
        </Button>

          
      </div>
    </>
  );
}

export default NavMenu;