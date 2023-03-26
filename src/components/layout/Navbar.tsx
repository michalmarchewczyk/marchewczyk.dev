import React, { useContext, useState } from 'react';
import classes from './Navbar.module.scss';
import { SectionsContext } from './sections';
import { Link } from 'react-router-dom';
import logotype from '../../assets/logotype.png';
import logo from '../../assets/logo.png';
import github from '../../assets/github.svg';
import { Burger, Container, MediaQuery, Tooltip } from '@mantine/core';
import { useHover, useMergedRef, useMouse } from '@mantine/hooks';

function Navbar() {
  const { sections } = useContext(SectionsContext);
  const [opened, setOpened] = useState(false);
  const { ref: refMouse, x, y } = useMouse();
  const { hovered, ref: refHover } = useHover();
  const ref = useMergedRef(refMouse, refHover);

  return (
    <>
      <MediaQuery smallerThan={'sm'} styles={{ display: 'none !important' }}>
        <Container size={'xl'} className={classes.NavbarContainer}>
          <div className={classes.Navbar} ref={ref}>
            <Link to={'/'}>
              <MediaQuery styles={{ display: 'none !important' }} smallerThan={'md'}>
                <img src={logotype} alt="" />
              </MediaQuery>
              <MediaQuery styles={{ display: 'none !important' }} largerThan={'md'}>
                <img src={logo} alt="" />
              </MediaQuery>
            </Link>
            <div></div>
            <figure style={{ left: x, top: y, opacity: hovered ? 1 : 0 }}></figure>
            {sections.map((section) => (
              <Link to={section} key={section} className={classes.Link} replace={true}>
                {section || 'home'}
              </Link>
            ))}
            <Tooltip
              label={'My GitHub profile'}
              position={'bottom'}
              color={'black'}
              offset={-10}
              openDelay={500}
              withinPortal
              zIndex={100000}
            >
              <a href="https://github.com/michalmarchewczyk" target="_blank" rel="noreferrer">
                <img src={github} alt={'GitHub profile'} />
              </a>
            </Tooltip>
          </div>
        </Container>
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
