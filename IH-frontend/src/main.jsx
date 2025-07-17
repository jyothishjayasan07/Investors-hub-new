import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import {ProjectProvider} from './context/ProjectContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <BrowserRouter>  
  <AuthProvider>
    <ProjectProvider>
       <App />
    </ProjectProvider>

     
  
  </AuthProvider>
  </BrowserRouter>
  </StrictMode>,
)
