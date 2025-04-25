// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import LivePage from "./pages/livePage/LivePage";
import SignUp from "./pages/signUp/SignUp";

import NewsDetails from "./pages/NewsDetails/NewsDetails";
import AllNews from "./pages/AllNews/AllNews";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Diffusion" element={<LivePage />} />
          <Route path="/Inscription" element={<SignUp />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/news" element={<AllNews />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
