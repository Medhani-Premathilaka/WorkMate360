import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App'
//import { Login } from './pages/Login'
//import { Home } from 'lucide-react'
import {Nav} from './components/Nav'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
