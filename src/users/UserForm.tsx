import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { User, UserContext } from './UserContext'

const initialFormData = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
} as User

const UserForm = () => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const userContext = useContext(UserContext)

  const user = userContext?.users.find(
    (user) => user.id == parseInt(userId || '')
  )

  const [formData, setFormData] = useState<User>(initialFormData)
  useEffect(() => {
    setFormData({
      ...initialFormData,
      ...user,
    })
  }, [user])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} role="form">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to="/users"
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'BlogScript',
                  fontWeight: 700,
                  lineHeight: '2rem', // prevent letters being cropped
                  mb: '-0.3rem', // align with breadcrumbs
                }}
                color="secondary"
              >
                {t('Navigation.Tabs.Users')}
              </Typography>
            </Link>
            {user ? (
              [
                <Link
                  underline="hover"
                  color="inherit"
                  component={RouterLink}
                  to={`/users/${userId}`}
                  key={1}
                >
                  <Typography>{userId}</Typography>
                </Link>,
                <Typography color="text.primary" key={2}>
                  {t('Navigation.Actions.UpdateUser')}
                </Typography>,
              ]
            ) : (
              <Typography color="text.primary">
                {t('Navigation.Actions.CreateUser')}
              </Typography>
            )}
          </Breadcrumbs>
        </Box>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 0 }}>
          <Button
            variant="outlined"
            component={RouterLink}
            to={user ? `/users/${userId}` : '/users'}
          >
            {t('Users.Actions.Cancel')}
          </Button>
          <Button variant="contained" endIcon={<SaveIcon />} type="submit">
            {t('Users.Actions.SaveUser')}
          </Button>
        </Stack>
      </Toolbar>
      <Stack spacing={1}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'BlogScript',
                fontWeight: 700,
                lineHeight: '2rem', // prevent letters being cropped
                mb: '-0.3rem', // align with breadcrumbs
              }}
              color="secondary"
            >
              {t('Users.Details.AccountDetails').toUpperCase()}
            </Typography>
            <Stack spacing={1} direction={'row'}>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label={t('Users.Attributes.Username')}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!!user}
                />
              </Stack>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t('Users.Attributes.Email')}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'BlogScript',
                fontWeight: 700,
                lineHeight: '2rem', // prevent letters being cropped
                mb: '-0.3rem', // align with breadcrumbs
              }}
              color="secondary"
            >
              {t('Users.Details.PersonalDetails').toUpperCase()}
            </Typography>
            <Stack spacing={1} direction={'row'}>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="first-name"
                  name="firstName"
                  label={t('Users.Attributes.FirstName')}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Stack>
              <Stack spacing={1} sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  id="last-name"
                  name="lastName"
                  label={t('Users.Attributes.LastName')}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </form>
  )
}

export default UserForm
