import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import store from './store/store'
import './style.css'
import { defult, white, white_primary } from './colors/colorsApp'



const theme = createTheme({
 typography: {
    fontFamily: '"Cairo", sans-serif',
  },
  palette: {
    text: { primary: white },
    background: { default: defult },
    primary: { main: white_primary},
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

