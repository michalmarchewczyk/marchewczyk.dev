import React, { useState } from 'react';
import { Route, Routes, useLocation, Location } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import { useDocumentTitle } from '@mantine/hooks';
import { SectionsContext } from './components/layout/sections';
import ProjectModal from './components/projects/ProjectModal';
import ProjectPage from './components/projects/ProjectPage';

function App() {
  useDocumentTitle('Michał Marchewczyk');
  const [sections, setSections] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <SectionsContext.Provider
        value={{
          sections,
          setSections,
          currentSection,
          setCurrentSection,
          isScrolling,
          setIsScrolling,
        }}
      >
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route path="/test" element={<div style={{ height: '400vh' }} />} />
            <Route path="/:section?" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectPage />}></Route>
          </Route>
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path="/projects/:id" element={<ProjectModal />}></Route>
          </Routes>
        )}
      </SectionsContext.Provider>
    </div>
  );
}

export default App;
