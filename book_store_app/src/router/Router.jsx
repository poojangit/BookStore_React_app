import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import NavBar from '../components/navbar/NavBar';

function Router() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='/signup' element={<AuthRoute><Login/></AuthRoute>}/>      
        <Route path='/' element={<ProtectedRoute><NavBar/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
