import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'virtual:windi.css';
import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <div className="grid justify-items-center h-screen bg-gradient-to-bl from-purple-400 via-pink-500 to-red-500">
      <div className="appContainer">
        <App />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
