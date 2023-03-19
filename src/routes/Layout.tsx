import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Background from '../components/Background';

function Layout() {
  return (
    <div>
      <Background />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
