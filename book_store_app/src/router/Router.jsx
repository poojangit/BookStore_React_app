import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/dashboard/Dashboard';
import Profile from '../components/profile/Profile';
import AllBooks from '../components/allbooks/AllBooks';
import ViewBook from '../components/viewbook/ViewBook';
import Cart from '../components/cart/Cart';
import Wishlist from '../components/wishlist/WishList';
import MyOrders from '../components/myorders/MyOrders';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<AuthRoute><Login /></AuthRoute>} />
          <Route path='/signup' element={<AuthRoute><Login /></AuthRoute>} />
          <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path= '/' element={<AllBooks/>}/>
            <Route path='profile' element= {<Profile/>}/>
            <Route path = 'bookdetails/:bookid' element = {<ViewBook/>}/>
            <Route path='cart' element = {<Cart/>}/>
            <Route path='wishlist' element ={<Wishlist/>}/>
            <Route path='myorders' element = {<MyOrders/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
