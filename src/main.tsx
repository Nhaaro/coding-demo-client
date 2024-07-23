import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewsProvider from './news/NewsContext.tsx'
import NewsPage from './news/NewsPage.tsx'
import UserProvider from './users/UserContext.tsx'
import UserDetails from './users/UserDetails.tsx'
import UserForm from './users/UserForm.tsx'
import UsersPage from './users/UsersPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/create',
        element: <UserForm />,
      },
      {
        path: 'users/:userId',
        element: <UserDetails />,
      },
      {
        path: 'users/:userId/edit',
        element: <UserForm />,
      },
      {
        path: 'news',
        element: <NewsPage />,
        children: [
          {
            path: ':new',
            element: <div>View New</div>,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <NewsProvider>
        <RouterProvider router={router} />
      </NewsProvider>
    </UserProvider>
  </React.StrictMode>
)
