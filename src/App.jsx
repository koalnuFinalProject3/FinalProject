import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MainPage from "./pages/main-page/MainPage";
import MyPage from "./pages/my-page/MyPage";
import DiaryPage from "./pages/diary-page/DiaryPage";
import TestPage from "./pages/test-page/TestPage";
import Login from "./pages/login-page/Login";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<MainPage />} />
        <Route path="my-page" element={<MyPage />} />
        <Route path="diary-page" element={<DiaryPage />} />
        <Route path="test-page" element={<TestPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
