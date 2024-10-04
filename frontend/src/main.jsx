import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrentTokenProvider } from './contexts/CurrentTokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentTokenProvider>
    <App />
    </CurrentTokenProvider>
  </StrictMode>,
)
