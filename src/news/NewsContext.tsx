import React, { createContext, useEffect, useState } from 'react'

import NEWS from '../../public/data/news.json?url'
import { Params } from 'react-router-dom'

export interface New {
  id: string
  title: string
  slug: string
  content: string
  date: string
  author: string
  featured: boolean
  thumbnail: string
  hero: string
  cols: number
  rows: number
}

export const NewsContext = createContext<
  | {
      news: New[]
      getNewsArticle: (params: Params<string>) => New | null
    }
  | undefined
>(undefined)

const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = useState<New[]>([])

  const fetchNews = async () => {
    const data = await fetch(NEWS)
    setNews(await data.json())
  }
  useEffect(() => {
    fetchNews()
  }, [])

  const getNewsArticle = ({ year, month, day, slug }: Params<string>) => {
    if (!year || !month || !day || !slug) return null
    return (
      news.find(
        (n) =>
          new Date(n.date).getTime() ===
            new Date([year, month, day].join('-')).getTime() && n.slug === slug
      ) || null
    )
  }

  return (
    <NewsContext.Provider value={{ news, getNewsArticle }}>
      {children}
    </NewsContext.Provider>
  )
}

export default NewsProvider
