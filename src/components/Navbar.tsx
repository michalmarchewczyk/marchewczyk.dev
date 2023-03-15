import React, { useContext } from 'react';
import classes from './Navbar.module.scss';
import { SectionsContext } from './sections';
import { Link } from 'react-router-dom';

function Navbar() {
  const { sections } = useContext(SectionsContext);

  return (
    <div className={classes.Navbar}>
      {sections.map((section) => (
        <Link to={section} key={section} className={classes.Link}>
          {section || 'home'}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
