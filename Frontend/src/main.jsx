import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Auth0Provider from './context/AuthProvider.jsx'
import ChatProvider from './context/ChatProvider.jsx'

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   <App /> when we are using the StrictMode then the same component is rendering two times
  // </StrictMode>,
  // <React.StrictMode>
    <Auth0Provider>
  <BrowserRouter>
  
    <Auth0Provider>
      <ChatProvider>
        <div className='dark:bg-slate-900 dark:text-white'>
          <App />
        </div>
        
      </ChatProvider>
    
    </Auth0Provider>
    {/* <div className='dark:bg-slate-900 dark:text-white'>
      <App />
    </div> */}
    
  </BrowserRouter>
    </Auth0Provider>
    // </React.StrictMode>

  // In React, BrowserRouter is a component provided by the react-router-dom library that enables
  // client-side routing for single-page applications (SPAs). It helps manage the browser's
  // history and URL path, allowing the application to display different components or pages based on the current URL.
);
