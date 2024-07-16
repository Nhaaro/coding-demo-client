import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'users',
        element: <div>users</div>,
        children: [
          {
            path: 'create',
            element: <div>create user</div>,
          },
          {
            path: ':user',
            element: <div>user $user</div>,
          },
          {
            path: ':user/edit',
            element: <div>edit</div>,
          },
          {
            path: ':user/delete',
            element: <div>delete</div>,
          },
        ],
      },
      {
        path: 'news',
        element: <div>news</div>,
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
    <RouterProvider router={router} />
  </React.StrictMode>
)
