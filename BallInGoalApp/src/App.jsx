// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage"
import LivePage from "./pages/LivePage"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Diffusion" element={<LivePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
