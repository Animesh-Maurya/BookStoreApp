import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> 
  //   <App /> when we are using the StrictMode then the same component is rendering two times
  // </StrictMode>,
  <BrowserRouter>
  
    <AuthProvider>
    <div className='dark:bg-slate-900 dark:text-white'>
      <App />
    </div>
    </AuthProvider>
    
  </BrowserRouter>

  // In React, BrowserRouter is a component provided by the react-router-dom library that enables 
  // client-side routing for single-page applications (SPAs). It helps manage the browser's 
  // history and URL path, allowing the application to display different components or pages based on the current URL.
  
)
