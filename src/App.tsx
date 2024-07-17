import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

import './i18n.ts'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4a773c',
      },
      secondary: {
        main: '#a01208',
      },
      background: {
        paper: '#fbf6ea',
        default: '#fbf6ea',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        component={'main'}
        sx={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
