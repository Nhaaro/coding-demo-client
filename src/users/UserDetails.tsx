import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { UserContext } from './UserContext'

const UserDetails = () => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const userContext = useContext(UserContext)

  const user = userContext?.users.find(
    (user) => user.id == parseInt(userId || '')
  )

  return !user ? (
    <div>no user</div>
  ) : (
    <>
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
            <Typography color="text.primary">{userId}</Typography>
          </Breadcrumbs>
        </Box>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 0 }}>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/users/${userId}/edit`}
            role="button"
          >
            {t('Users.Actions.UpdateUser')}
          </Button>
        </Stack>
      </Toolbar>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                '& img': {
                  borderRadius: '50%',
                  padding: '3rem',
                },
              }}
            >
              <img
                src={`https://i.pravatar.cc/150?img=${userId}`}
                alt={`https://i.pravatar.cc/150?img=${userId}`}
              />
              <Typography textAlign={'center'} color={'primary'}>
                @{user.username}
              </Typography>
              <Typography textAlign={'center'} variant="h4">
                {user.firstName + ' ' + user.lastName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
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
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography>
                      <strong>{t('Users.Details.ID')}</strong>
                      {user.id}
                    </Typography>
                    <Typography>
                      <strong>{t('Users.Details.Status.Label')}</strong>
                      {user.active
                        ? t('Users.Details.Status.Active')
                        : t('Users.Details.Status.Inactive')}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography>
                      <strong>{t('Users.Details.Email')}</strong>
                      {user.email}
                    </Typography>
                    <Typography>
                      <strong>{t('Users.Details.CreatedAt')}</strong>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
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
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography>
                      <strong>{t('Users.Details.FirstName')}</strong>
                      {user.firstName}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography>
                      <strong>{t('Users.Details.LastName')}</strong>
                      {user.lastName}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default UserDetails
