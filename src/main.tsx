import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,

  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.tsx';
import Chat2 from './pages/Chat2.tsx';
import Chat from './pages/Chat.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/chat2",
    element: <Chat2 />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
