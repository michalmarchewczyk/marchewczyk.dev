import React from 'react';
import Section from '../../components/layout/Section';
import classes from './Projects.module.scss';
import ProjectLink from '../../components/projects/ProjectLink';
import { projects } from '../../lib/projects';

function Projects() {
  return (
    <Section name={'projects'}>
      <div className={classes.Projects}>
        <h2>Projects</h2>
        {projects.map((project) => (
          <ProjectLink project={project} key={project.key} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
