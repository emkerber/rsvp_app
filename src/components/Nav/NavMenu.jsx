import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Menu,
  MenuItem,
} from '@mui/material';

// the hamburger icon
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

import './NavMenu.css';

function NavMenu() {
  const dispatch = useDispatch();

  const isAdmin = useSelector(store => store.user.admin);
  const inviteStatus = useSelector(store => store.invite.inviteStatus);
  const allResponses = useSelector(store => store.invite.allResponses);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  }

  // MENU ITEMS:
  // guest: My RSVP, Deets, if all responses then Guest List, Logout
  // pending: Logout
  // none: Logout
  // admin: Guests, New / Nope, Pending, My RSVP, Deets, if all responses then Guest List, Logout

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DensityMediumIcon className="nav-icon" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        
        {isAdmin && 
          <div>
            <MenuItem>
              <Link to="/admin/guests" className="nav-link">Guests</Link>
            </MenuItem>

            <MenuItem>
              <Link to="/admin/new-nope" className="nav-link">New / Nope</Link>
            </MenuItem>

            <MenuItem>
              <Link to="/admin/pending" className="nav-link">Pending</Link>
            </MenuItem>
          </div>
        }

        {inviteStatus === 'guest' &&
          <div>
            <MenuItem>
              <Link to="/user" className="nav-link">My RSVP</Link>
            </MenuItem>

            <MenuItem>
              <Link to="/deets" className="nav-link">Deets</Link>
            </MenuItem>
          </div>
        }

        {allResponses &&
          <MenuItem>
            <Link to="/guest-list" className="nav-link">Guest List</Link>
          </MenuItem>
        }

        <MenuItem onClick={handleLogout}>
          <Link to="/" className="nav-link">Logout</Link>
        </MenuItem>
      
      </Menu>

          
    </>
  );
}

export default NavMenu;