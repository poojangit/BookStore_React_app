import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const storedJsonString = localStorage.getItem('userData')
    console.log("Local storage--->"+localStorage.getItem('userData'));
    console.log("token -------> "+ localStorage.getItem('token'));
    const storedData = JSON.parse(storedJsonString)
    console.log(JSON.parse(storedJsonString));
    if(storedData === null || storedData === undefined){
        return children
    }
    return <Navigate to = "/"/>
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     return children;
    // }
    // return <Navigate to="/" />;
}

export default AuthRoute;

