import React from 'react';
import Section from '../../components/Section';
import classes from './Projects.module.scss';

function Projects() {
  return (
    <Section name={'projects'}>
      <div className={classes.Projects}>Projects</div>
    </Section>
  );
}

export default Projects;
