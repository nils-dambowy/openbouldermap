import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1> 🏔️open <span className='text-backg'><span className='text-backg-span'>BoulderMap </span></span>🏔️</h1>
    <App />
    <span></span>
  </StrictMode>
)
