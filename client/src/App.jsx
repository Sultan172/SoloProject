import { useEffect, useState } from 'react'
// import axios from 'axios'
// import MainPage from './components/pages/MainPage'
import "./App.css";
import axiosInstance, { setAccessToken } from './services/axiosInstance';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout'
import RegistrationPage from './components/pages/RegistrationPage'
import LoginPage from "./components/pages/LoginPage";
import MainPage from './components/pages/MainPage';

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    axiosInstance
      .get('/tokens/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const registerHandler = async (e, FormData) => {
    e.preventDefault();
    const response = await axiosInstance.post(`${import.meta.env.VITE_API_STRAIGHT}/auth/signup`, FormData)
    setUser(response.data.user)
    setAccessToken(response.data.accessToken);
  }

  const loginHandler = async (e, formData) => {
    e.preventDefault();
    const response = await axiosInstance.post(`${import.meta.env.VITE_API_STRAIGHT}/auth/login`, formData);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
  };
  const logoutHandler = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler}/>,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: '/signup',
          element: <RegistrationPage registerHandler={registerHandler}/>,
        },
        {
          path: '/login',
          element: <LoginPage loginHandler={loginHandler}/>,
        },
        
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
