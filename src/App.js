import React from 'react';
import ReportByMonth from './reportByMonth';
import { CookiesProvider } from 'react-cookie';

import './App.css';

require('dotenv').config();

const App = () => {

  return (
    <CookiesProvider>
      <ReportByMonth />
    </CookiesProvider>
  );
}

export default App;
