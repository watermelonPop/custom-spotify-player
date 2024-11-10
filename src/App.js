import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'
import './App.css';
import Dashboard from "./Dashboard";
const code = new URLSearchParams(window.location.search).get("code");
//returns anything return after the url
function App() {
  return (
    <Router>
      {code ? <Dashboard code={code} /> : <Login />}
    </Router>
  );
}

export default App;
