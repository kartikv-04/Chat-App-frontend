

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

window.addEventListener('error', (e) => {
  e.stopImmediatePropagation?.();
  e.preventDefault?.();
  return false;
});

window.addEventListener('unhandledrejection', (e) => {
  e.stopImmediatePropagation?.();
  e.preventDefault?.();
  return false;
});


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <App />

  </BrowserRouter>

)
