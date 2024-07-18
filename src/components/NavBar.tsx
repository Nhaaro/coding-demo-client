import React, { FormEvent, FormEventHandler } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'

import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const NavBar = () => {
  const { t, i18n } = useTranslation()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const { pathname } = useLocation()
  const pages = [
    { path: '/users', label: t('Navigation.Tabs.Users') },
    { path: '/news', label: t('Navigation.Tabs.News') },
  ]
  const currentTab = pages.find((page) => pathname.startsWith(page.path))?.path

  const [anchorElLocale, setAnchorElLocale] =
    React.useState<null | HTMLElement>(null)
  const handleOpenLocaleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLocale(event.currentTarget)
  }
  const handleCloseLocaleMenu = () => {
    setAnchorElLocale(null)
  }
  const handleLanguageChange = (
    event: SelectChangeEvent | React.MouseEvent<HTMLLIElement>
  ) => {
    if ('tagName' in event.target) {
      i18n.changeLanguage(event.target.attributes.getNamedItem('value')?.value)
      handleCloseLocaleMenu()
    } else if ('value' in event.target) {
      i18n.changeLanguage(event.target.value)
    }
  }

  return (
    <AppBar position="fixed" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlogScript',
              fontWeight: 700,
              textDecoration: 'none',
              lineHeight: '190%', // prevent letters being cropped
            }}
            color="primary"
          >
            CODING DEMO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation"
              aria-controls="menu-navigation"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-navigation"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.path}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path || ''}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'BlogScript',
              fontWeight: 700,
              textDecoration: 'none',
              lineHeight: '190%', // prevent letters being cropped
            }}
            color="primary"
          >
            DEMO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={currentTab}>
              {pages.map((page) => (
                <Tab
                  key={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 1 }}
                  label={page.label}
                  value={page.path || ''}
                  component={Link}
                  to={page.path || ''}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation"
              aria-controls="menu-locale"
              aria-haspopup="true"
              onClick={handleOpenLocaleMenu}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <Menu
              id="menu-locale"
              anchorEl={anchorElLocale}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElLocale)}
              onClose={handleCloseLocaleMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={handleLanguageChange}
                value={'en-GB'}
                role="option"
              >
                {t('i18n.Languages.English')}
              </MenuItem>
              <MenuItem
                onClick={handleLanguageChange}
                value={'es-MX'}
                role="option"
              >
                {t('i18n.Languages.Spanish')}
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Select value={i18n.language} onChange={handleLanguageChange}>
              <MenuItem value={'en-GB'}>{t('i18n.Languages.English')}</MenuItem>
              <MenuItem value={'es-MX'}>{t('i18n.Languages.Spanish')}</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
