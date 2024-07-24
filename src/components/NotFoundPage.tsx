import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface NotFoundProps {
  text?: string
  children?: React.ReactNode
}

const NotFound = (props: NotFoundProps) => {
  const { t } = useTranslation()

  const text = props.text ?? t('Navigation.404.Default.Text')
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
        <Typography variant="h4" maxWidth={'sm'} gutterBottom>
          {text}
        </Typography>
        {props.children}
      </Box>
    </Box>
  )
}

export default NotFound
