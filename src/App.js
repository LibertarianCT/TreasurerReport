import React from "react";
import ReportByMonth from "./reportByMonth";
import AuthProvider from "./authProvider";

import "./App.css";

require("dotenv").config();

const App = () => {
  return (
    <AuthProvider>
      <ReportByMonth />
    </AuthProvider>
  );
};

export default App;
