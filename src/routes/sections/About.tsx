import React from 'react';
import Section from '../../components/Section';
import classes from './About.module.scss';

function About() {
  return (
    <Section name={'about'}>
      <div className={classes.About}>About</div>
    </Section>
  );
}

export default About;
