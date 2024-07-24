import { Box, Button, Container, Typography } from '@mui/material'
import parse from 'html-react-parser'
import { useContext } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { NewsContext } from './NewsContext'
import NotFound from '../components/NotFoundPage'
import { useTranslation } from 'react-i18next'

const NewsDetailPage = () => {
  const newsContext = useContext(NewsContext)
  const params = useParams()
  const article = newsContext?.getNewsArticle(params)
  const { t } = useTranslation()

  return !article ? (
    <NotFound text={t('Navigation.404.News.Text')}>
      <Button variant="outlined" component={RouterLink} to="/news">
        {t('Navigation.404.News.Return')}
      </Button>
    </NotFound>
  ) : (
    <Container maxWidth="md">
      <Box>
        <img
          src={article.hero} // first few ids on picsum are very similar, skipping them
          alt={article.title}
          width={'100%'}
          height={500}
          style={{ objectFit: 'cover' }}
        />

        <Typography
          variant="h2"
          sx={{
            fontFamily: 'BlogScript',
            fontWeight: 700,
          }}
          color="secondary"
          mt={3}
          gutterBottom
        >
          {article.title}
        </Typography>

        {parse(article.content)}
      </Box>
    </Container>
  )
}

export default NewsDetailPage
