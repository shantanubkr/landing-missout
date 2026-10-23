import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ColorThemeProvider } from './components/findus/ColorThemeProvider'
import '@bible-strong/avatar-react/styles.css'
import './index.css'
import App from './App.tsx'
import { applySiteMetaBaseUrl, getSiteUrl } from './lib/siteUrl'

const siteUrl = getSiteUrl()
if (siteUrl) applySiteMetaBaseUrl(siteUrl)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ColorThemeProvider>
        <App />
      </ColorThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
