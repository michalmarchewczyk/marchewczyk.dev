import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import Home from './routes/Home';
import { useDocumentTitle } from '@mantine/hooks';

function App() {
  useDocumentTitle('Michał Marchewczyk');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
