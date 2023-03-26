import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './sections/Header';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { SectionsContext } from '../components/layout/sections';
import { Container } from '@mantine/core';

function Home() {
  const { section } = useParams<{ section: string }>();
  const { setCurrentSection } = useContext(SectionsContext);

  useEffect(() => {
    setCurrentSection(section ?? '');
  }, [section]);

  return (
    <Container size={'xl'} p={40} pt={0} sx={{ '@media (max-width: 500px)': { padding: 10 } }}>
      <Header />
      <About />
      <Projects />
      <Contact />
    </Container>
  );
}

export default Home;
