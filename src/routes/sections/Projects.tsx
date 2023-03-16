import React from 'react';
import Section from '../../components/Section';
import classes from './Projects.module.scss';
import ProjectLink, { Project } from '../../components/ProjectLink';

const projectFiles = import.meta.glob('../projects/**/index.md', { as: 'raw', eager: true });
const projectThumbnails = import.meta.glob('../projects/**/thumbnail.{png,jpg}', {
  as: 'url',
  eager: true,
});

const projects: Project[] = Object.entries(projectFiles)
  .map(([key, value]) => {
    const frontmatterText = value.split('---')[1];
    const frontmatter = Object.fromEntries(
      frontmatterText.split('\n').map((line: string) => line.trim().split(': ')),
    );
    let thumbnail = projectThumbnails[key.replace('index.md', 'thumbnail.png')];
    thumbnail ??= projectThumbnails[key.replace('index.md', 'thumbnail.jpg')];
    return {
      key: key.replace('../projects/', '').replace('/index.md', ''),
      category: frontmatter.category,
      title: frontmatter.title,
      description: frontmatter.description,
      technologies: frontmatter.technologies.split(', '),
      index: frontmatter.index,
      size: frontmatter.size,
      thumbnail,
      github: frontmatter.github,
      url: frontmatter.url,
    };
  })
  .sort((a, b) => a.index - b.index);

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
