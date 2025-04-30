import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './layout/AppLayout.jsx';
// import AppLayout from './layout/AppLayout';
import MainPage from './pages/main-page/MainPage.jsx';
import MyPage from './pages/my-page/MyPage.jsx';
import DiaryPage from './pages/diary-page/DiaryPage.jsx';
import TestPage from './pages/test-page/TestPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'my-page', element: <MyPage /> },
      { path: 'diary-page', element: <DiaryPage /> },
      { path: 'test-page', element: <TestPage /> },
    ],
  },
]);

export default router;
