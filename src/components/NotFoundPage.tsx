import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{ position: 'fixed', height: '100%', width: '100%', display: 'flex' }}
      m={-3}
    >
      <Box m={'auto'} sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'BlogScript',
            fontWeight: 700,
          }}
          color="secondary"
          mt={3}
        >
          404
        </Typography>
        <Typography variant="h6" gutterBottom color="secondary">
          {t('Navigation.404.NotFound')}
        </Typography>
        <Typography variant="h4" maxWidth={'sm'}>
          {t('Navigation.404.Text')}
        </Typography>
      </Box>
    </Box>
  )
}

export default NotFound
