import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '../shared/index.css'
import { ThemeProvider } from '@/shared/components/theme-provider'
import { store } from './store/index.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme="system">
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
)
