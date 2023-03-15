import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import { useDocumentTitle } from '@mantine/hooks';
import { SectionsContext } from './components/sections';

function App() {
  useDocumentTitle('Michał Marchewczyk');
  const [sections, setSections] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:section?" element={<Home />} />
          </Route>
        </Routes>
      </SectionsContext.Provider>{' '}
    </div>
  );
}

export default App;
