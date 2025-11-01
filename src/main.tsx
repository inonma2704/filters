import React from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'
import App from './App'

const theme = createTheme()

const rootElement = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Cannot find root element')
}

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
