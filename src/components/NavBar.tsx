import React from 'react'

import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const { pathname } = useLocation()
  const pages = [
    { path: '/users', label: 'Users' },
    { path: '/news', label: 'News' },
  ]
  const currentTab = pages.find((page) => pathname.startsWith(page.path))?.path

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
              fontFamily: '"Playwrite AT", cursive',
              fontWeight: 700,
              color: '#4a773c',
              textDecoration: 'none',
              lineHeight: '190%', // prevent letters being cropped
            }}
          >
            CODING DEMO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              fontFamily: '"Playwrite AT", cursive',
              fontWeight: 700,
              color: '#4a773c',
              textDecoration: 'none',
              lineHeight: '190%', // prevent letters being cropped
            }}
          >
            CODING DEMO
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
