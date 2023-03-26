import React from 'react';
import Section from '../../components/layout/Section';
import classes from './Header.module.scss';
import { Button, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconArrowDown } from '@tabler/icons-react';
import github from '../../assets/github.svg';

function Header() {
  return (
    <Section name={''}>
      <div className={classes.Header}>
        <Text size={32} weight={700} mb={-8} mt={40}>
          Hi, I&apos;m Michał
        </Text>
        <Text size={64} weight={700} className={classes.HeaderAnim}>
          I create
          <div>
            <span>
              Complex web apps <br />
              Reliable backends <br />
              Robust systems <br />
              Stunning designs <br />
              Complex web apps <br />
            </span>
          </div>
        </Text>
        <div>
          <Button
            size={'xl'}
            color={'dark'}
            variant={'outline'}
            leftIcon={<IconArrowDown size={32} />}
            component={Link}
            to={'/projects'}
          >
            My projects
          </Button>
          <Button
            size={'xl'}
            color={'dark'}
            variant={'outline'}
            leftIcon={<img src={github} alt={''} />}
            component={Link}
            to={'https://github.com/michalmarchewczyk'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            GitHub
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default Header;
