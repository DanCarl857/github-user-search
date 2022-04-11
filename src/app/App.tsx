import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import * as Pages from '../views'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
