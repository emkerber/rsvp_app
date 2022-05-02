import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <FavoriteIcon id="footer-heart-left" className="heart" />
      <span id="footer-span">The Bringol concept and this site were developed with love by Liz Kerber.</span>
      <FavoriteIcon id="footer-heart-right" className="heart" />
    </footer>
  );
}

export default Footer;
