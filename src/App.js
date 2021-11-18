import React, { useState } from 'react';
import AuthProvider from './authProvider';
import ReportByMonth from './reportByMonth';

import './App.css';

require('dotenv').config();

const App = () => {

  const [token, setToken] = useState('');

  return (
    <AuthProvider token={token} setToken={setToken}>
      <ReportByMonth token={token} />
    </AuthProvider>
  );
}

export default App;
