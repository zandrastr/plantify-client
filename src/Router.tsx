import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from './Layout';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/PrivateRoute';
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage/EditProfilePage'));
const PlantCardPage = lazy(() => import('./pages/PlantCardPage/PlantCardPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile',
        element: <PrivateRoute element={<ProfilePage />} />,
      },
      {
        path: '/profile/edit',
        element: <PrivateRoute element={<EditProfilePage />} />,
      },
      {
        path: '/plant',
        element: <PlantCardPage />,
      },
      {
        path: '/plant/:latinName',
        element: <PlantCardPage />,
      },
      {
        path: '/favorites',
        element: <PrivateRoute element={<FavoritesPage />} />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
    ],
  },
]);
