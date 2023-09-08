import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/global-styles.css'
import './styles/app.scss'

import reportWebVitals from './reportWebVitals';

import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';

import store from './store';

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <Provider store={store}>

       <App />

    </Provider>

  </React.StrictMode>

);