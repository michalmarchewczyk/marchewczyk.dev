import React, { useState } from 'react';
import { projects } from '../../lib/projects';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import classes from './Project.module.scss';
import { ActionIcon, Badge, Box, Button, Text } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { IconChevronLeft, IconChevronRight, IconExternalLink, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useHover, useMediaQuery } from '@mantine/hooks';
import github from '../../assets/github-white.svg';

function Project({ id }: { id: string }) {
  const project = projects.find((project) => project.key === id);
  const { hovered, ref } = useHover();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [embla, setEmbla] = useState<Embla | null>(null);

  useAnimationOffsetEffect(embla, 200);

  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className={classes.ProjectContainer}>
      <Carousel
        getEmblaApi={setEmbla}
        ref={ref}
        withIndicators
        className={classes.ProjectImages}
        slideSize={'100%'}
        loop
        controlsOffset={16}
        previousControlIcon={<IconChevronLeft size={32} />}
        nextControlIcon={<IconChevronRight size={32} />}
        styles={{
          indicator: {
            background: 'black',
            height: 8,
            width: 8,
            transition: 'width 0.2s ease-in-out',
            '&[data-active]': {
              width: 24,
            },
          },
          control: {
            background: 'white',
            border: 'none',
            padding: 5,
          },
          controls: {
            transition: 'opacity 0.1s ease-in-out',
            opacity: hovered ? 1 : 0,
          },
        }}
      >
        {project.images.map((image) => (
          <Carousel.Slide key={image}>
            <img src={image} alt={''} className={classes.Image} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <ActionIcon
        component={Link}
        to={'/projects'}
        state={{ backgroundLocation: undefined }}
        className={classes.BackButton}
        variant={'light'}
        radius={'xl'}
        size={'xl'}
      >
        <IconX size={30} />
      </ActionIcon>
      <Box p={30} pos={'relative'} className={classes.ProjectData}>
        <Text color="#888888" size={20} weight={700}>
          {project.category}
        </Text>
        <Text color="black" size={40} weight={700} mt={0} mb={16}>
          {project.title}
        </Text>
        <div
          className={!isMobile && project.github && project.url ? classes.ProjectTechnologies : ''}
        >
          {project.technologies.map((technology) => (
            <Badge color={'dark'} key={technology} size={'xl'} variant={'outline'} mr={8} mb={8}>
              {technology}
            </Badge>
          ))}
        </div>
        <div className={classes.ProjectLinks}>
          {project.github && (
            <Button
              radius={'xl'}
              size={'lg'}
              mt={10}
              w={isMobile ? 50 : 220}
              color={'dark'}
              leftIcon={
                <img
                  src={github}
                  alt=""
                  style={{
                    height: '28px',
                    marginLeft: isMobile ? '28px' : '0px',
                    marginRight: '10px',
                  }}
                />
              }
              component={Link}
              to={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isMobile ? '' : 'View source'}
            </Button>
          )}
          {project.url && (
            <Button
              radius={'xl'}
              size={'lg'}
              mt={10}
              w={isMobile ? 50 : 220}
              color={'dark'}
              leftIcon={
                <IconExternalLink
                  size={32}
                  style={{
                    marginLeft: isMobile ? '28px' : '0px',
                    marginRight: '10px',
                  }}
                />
              }
              component={Link}
              to={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isMobile ? '' : 'Open project'}
            </Button>
          )}
        </div>
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </Box>
    </div>
  );
}

export default Project;
