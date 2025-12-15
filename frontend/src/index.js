import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomeCrudeContextProvider } from './context/HomeCrudeContext';

const theme = createTheme({
  palette:{
    primary: {main:"#ff2323ff",},
    secondary: {main:"#878787ff",},
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Router>
          <HomeCrudeContextProvider>
            <App />
          </HomeCrudeContextProvider>
        </Router>
    </ThemeProvider>
  </React.StrictMode>
   
);

