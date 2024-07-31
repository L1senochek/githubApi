import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import Router from './components/Router/Router';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
};

export default App;
