import React, { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge, Button, Card, Text } from '@mantine/core';
import classes from './ProjectLink.module.scss';
import { useHover, useMergedRef, useMouse } from '@mantine/hooks';
import github from '../assets/github-white.svg';
import { IconExternalLink } from '@tabler/icons-react';
import { ProjectData } from '../lib/projects';

function ProjectLink({ project }: { project: ProjectData }) {
  const { ref: refMouse, x, y } = useMouse();
  const { hovered, ref: refHover } = useHover();
  const ref = useMergedRef(refMouse, refHover);
  const rect = refMouse.current?.getBoundingClientRect();
  const location = useLocation();

  return (
    <div
      ref={ref}
      className={`${classes.CardContainer} ${
        project.size === 'lg' ? classes.CardLg : classes.CardSm
      }`}
    >
      <Card
        className={classes.Card}
        style={
          {
            '--hover-x': hovered ? (x - rect.width / 2) / rect.width ?? 0 : 0,
            '--hover-y': hovered ? (y - rect.height / 2) / rect.height ?? 0 : 0,
          } as CSSProperties
        }
      >
        <div>
          <Link to={'/projects/' + project.key} state={{ backgroundLocation: location }}></Link>
          <img src={project.thumbnail} alt={''} />
        </div>
        <div>
          <Link to={'/projects/' + project.key} state={{ backgroundLocation: location }}>
            <Text color="#888888" size={20} weight={700}>
              {project.category}
            </Text>
            <Text color="black" size={40} weight={700} mt={-4} mb={8}>
              {project.title}
            </Text>

            {project.technologies.map((technology) => (
              <Badge color={'dark'} key={technology} size={'lg'} variant={'outline'} mr={8} mb={8}>
                {technology}
              </Badge>
            ))}

            {project.size === 'lg' && (
              <Text color="#444444" size={18} weight={500} mt={12} mb={8} lineClamp={4}>
                {project.description}
              </Text>
            )}
          </Link>
          <div style={{ flex: 1 }}></div>
          {project.github && project.size === 'lg' && (
            <Button
              radius={'xl'}
              size={'lg'}
              w={'100%'}
              mt={20}
              color={'dark'}
              leftIcon={<img src={github} alt="" style={{ height: '28px', marginRight: '10px' }} />}
              component={Link}
              to={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View source
            </Button>
          )}
          {project.url && project.size === 'lg' && (
            <Button
              radius={'xl'}
              size={'lg'}
              w={'100%'}
              mt={20}
              color={'dark'}
              leftIcon={<IconExternalLink size={32} style={{ marginRight: '10px' }} />}
              component={Link}
              to={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open project
            </Button>
          )}
        </div>
        <figure style={{ left: x, top: y, opacity: hovered ? 1 : 0 }}></figure>
      </Card>
    </div>
  );
}

export default ProjectLink;
