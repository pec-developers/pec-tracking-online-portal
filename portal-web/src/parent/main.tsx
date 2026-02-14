import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../shared/index.css'
import { ThemeProvider } from '@/shared/components/theme-provider'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system">
            <App />
        </ThemeProvider>
    </StrictMode>,
)
