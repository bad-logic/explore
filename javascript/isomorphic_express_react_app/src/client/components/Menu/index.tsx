import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/contact-us'}>contact</Link>
      </li>
      <li>
        <Link to={'/about-us'}>About</Link>
      </li>
    </ul>
  );
};

export default Menu;
