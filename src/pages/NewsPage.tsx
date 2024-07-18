import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import NEWS from '../data/news.json'

const NewsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Toolbar>
        <Typography
          variant="h2"
          color="secondary"
          fontFamily={'BlogScript'}
          fontWeight={700}
        >
          {t('Navigation.Tabs.News')}
        </Typography>
      </Toolbar>

      <Container>
        <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
          {NEWS.map((item, index) => {
            return (
              <Grid item key={item.id} xs={6} sm={4} md={4} height={150}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea
                    component={Link}
                    to={`/news/${item.title}`}
                    sx={{ display: 'flex', height: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151, flex: 0 }}
                      image={`https://picsum.photos/id/${index + 10}/300/300`} // first few ids on picsum are very similar, skipping them
                      alt={item.title}
                    />
                    <Box sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography
                          variant="caption"
                          color="primary"
                          gutterBottom
                        >
                          {item.author}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {item.title}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default NewsPage
