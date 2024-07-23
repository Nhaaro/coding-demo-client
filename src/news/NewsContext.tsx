import React, { createContext, useEffect, useState } from 'react'

import NEWS from '../../public/data/news.json?url'

export interface New {
  id: string
  title: string
  content: string
  date: string
  author: string
  featured: boolean
  cols: number
  rows: number
}

export const NewsContext = createContext<{ news: New[] } | undefined>(undefined)

const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = useState<New[]>([])

  const fetchNews = async () => {
    const data = await fetch(NEWS)
    setNews(await data.json())
  }
  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <NewsContext.Provider value={{ news }}>{children}</NewsContext.Provider>
  )
}

export default NewsProvider
