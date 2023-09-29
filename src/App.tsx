import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { ReactNode } from 'react'

import { IndexPage } from './pages/index/index.page'

const defaultQueryClient = new QueryClient()

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard',
            },
        },
    },
})

function App(): ReactNode {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={defaultQueryClient}>
                <div className="app-container">
                    <IndexPage />
                </div>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
