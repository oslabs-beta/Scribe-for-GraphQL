import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './index.css';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
function App() {
  return (
    <>
      <h1 className='text-3xl font-bold underline text-center'>Hello world!</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
