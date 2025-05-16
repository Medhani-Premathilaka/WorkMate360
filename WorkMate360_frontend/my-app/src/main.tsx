import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App'
import { Login } from './pages/Login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
