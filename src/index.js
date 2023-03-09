import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from "react-router-dom"
import { LoginContextProvider } from "./context/loginContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </HashRouter>
  </React.StrictMode>
);