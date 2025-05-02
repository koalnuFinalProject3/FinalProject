import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';
// import AppLayout from './layout/AppLayout';
import MainPage from './pages/main-page/MainPage.jsx';
import MyPage from './pages/my-page/MyPage.jsx';
import DiaryPage from './pages/diary-page/DiaryPage.jsx';
import TestPage from './pages/test-page/TestPage.jsx';
import Login from './pages/login-page/Login.jsx';
import Test2 from './pages/test2-page/Test2.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'main', element: <MainPage /> },
      { path: 'my', element: <MyPage /> },
      { path: 'diary', element: <DiaryPage /> },
      { path: 'test', element: <TestPage /> },
      { path: 'test2', element: <Test2 /> },
    ],
  },
]);

export default router;
