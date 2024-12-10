import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <h1> 🏔️open <span className="text-backg "><span className="text-backg-span">BoulderMap</span></span>🏔️</h1>
        <App/>
        <section id="footer">
            <span>Please feel free to contribute to this project on <a
                href="https://github.com/nils-dambowy/openbouldermap" target="_blank" rel="noreferrer">GitHub</a></span>
        </section>
    </StrictMode>
)