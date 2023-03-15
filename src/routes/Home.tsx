import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './sections/Header';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import { SectionsContext } from '../components/sections';

function Home() {
  const { section } = useParams();
  const { setCurrentSection } = useContext(SectionsContext);

  useEffect(() => {
    setCurrentSection(section ?? '');
  }, [section]);

  return (
    <div>
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default Home;
