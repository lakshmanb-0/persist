import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ViewPage from './pages/ViewPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import { ConfigProvider, theme } from 'antd'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/news/:id',
    element: <ViewPage />,
  },
  {
    path: '/search/:id',
    element: <SearchPage />,
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}>
      <RouterProvider router={router} />
    </ConfigProvider>

  </React.StrictMode>,
)
