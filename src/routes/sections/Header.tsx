import React from 'react';
import Section from '../../components/Section';
import classes from './Header.module.scss';

function Header() {
  return (
    <Section name={''}>
      <div className={classes.Header}>Header</div>
    </Section>
  );
}

export default Header;
