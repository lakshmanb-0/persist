import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'

import ViewPage from './pages/ViewPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

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
        // dark mode of ant components
      }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>

  </React.StrictMode>,
)
