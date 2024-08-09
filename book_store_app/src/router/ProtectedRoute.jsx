import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  //   const storedJsonString = localStorage.getItem('userData')
  //   const token = localStorage.getItem('token')
  //   console.log(token)
  //   const storedData = JSON.parse(storedJsonString)
  //   console.log(storedData);
  //   if( token !== undefined) {
  //       return chilren
  //   }
  // return <Navigate to = "/login"/>
  const token = localStorage.getItem('token');
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;

