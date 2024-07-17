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
import { enUS, esES } from '@mui/x-data-grid/locales'

import './i18n.ts'
import { useTranslation } from 'react-i18next'

function App() {
  const { i18n } = useTranslation()
  let locale
  switch (i18n.resolvedLanguage) {
    case 'es':
      locale = esES
      break
    case 'en':
      locale = enUS
      break

    default:
      locale = enUS
      break
  }

  const theme = createTheme(
    {
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
    },
    locale
  )

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
