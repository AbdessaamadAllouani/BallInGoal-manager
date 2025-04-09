// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage"
function App() {

  return (
    <>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </>
  );
}

export default App
