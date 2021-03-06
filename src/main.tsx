import React from 'react';
import ReactDOM from 'react-dom';
import '@material/ripple/dist/mdc.ripple.min.css';
import './index.css';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <div className="grid justify-items-center h-full bg-gradient-to-bl from-purple-400 via-pink-500 to-red-500">
      <div className="app-container">
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
