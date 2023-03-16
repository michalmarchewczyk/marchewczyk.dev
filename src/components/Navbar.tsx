import React, { useContext, useState } from 'react';
import classes from './Navbar.module.scss';
import { SectionsContext } from './sections';
import { Link } from 'react-router-dom';
import logotype from '../assets/logotype.png';
import logo from '../assets/logo.png';
import github from '../assets/github.svg';
import { Burger, MediaQuery, Tooltip } from '@mantine/core';

function Navbar() {
  const { sections } = useContext(SectionsContext);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MediaQuery smallerThan={'sm'} styles={{ display: 'none !important' }}>
        <div className={classes.Navbar}>
          <Link to={'/'}>
            <MediaQuery styles={{ display: 'none !important' }} smallerThan={'md'}>
              <img src={logotype} alt="" />
            </MediaQuery>
            <MediaQuery styles={{ display: 'none !important' }} largerThan={'md'}>
              <img src={logo} alt="" />
            </MediaQuery>
          </Link>
          <div></div>
          {sections.map((section) => (
            <Link to={section} key={section} className={classes.Link}>
              {section || 'home'}
            </Link>
          ))}
          <Tooltip
            label={'My GitHub profile'}
            position={'bottom'}
            color={'black'}
            offset={-10}
            openDelay={500}
          >
            <a href="https://github.com/michalmarchewczyk" target="_blank" rel="noreferrer">
              <img src={github} alt={'GitHub profile'} />
            </a>
          </Tooltip>
        </div>
      </MediaQuery>
      <MediaQuery largerThan={'sm'} styles={{ display: 'none !important' }}>
        <div
          className={classes.NavbarMobile}
          style={{ height: opened ? 'calc(100vh - 30px)' : '80px' }}
        >
          <Link to={'/'} onClick={() => setOpened(false)}>
            <img src={logo} alt="" />
          </Link>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size={'lg'}
            styles={{
              burger: {
                height: '4px !important',
                '&::before': {
                  height: '4px !important',
                },
                '&::after': {
                  height: '4px !important',
                },
              },
            }}
          />
          <div className={classes.LinksMobile}>
            {sections.map((section) => (
              <Link
                to={section}
                key={section}
                className={classes.LinkMobile}
                onClick={() => setOpened(false)}
              >
                {section || 'home'}
              </Link>
            ))}
            <a href="https://github.com/michalmarchewczyk" target="_blank" rel="noreferrer">
              <img src={github} alt={'GitHub profile'} />
            </a>
          </div>
        </div>
      </MediaQuery>
    </>
  );
}

export default Navbar;
