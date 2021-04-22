import React from 'react';
import ReactDOM from 'react-dom';

// import "./assets/css/main.css";

import LandingScreen from './screens/LandingScreen';

// Custom debugging setting, if show error just comment it (in .gitignore).
import './logrocket';

const App = () => {
  document.body.style.backgroundColor = '#100042';
  document.body.style.margin = 0;
  return <LandingScreen />;
};

ReactDOM.render(<App />, document.getElementById('app'));
