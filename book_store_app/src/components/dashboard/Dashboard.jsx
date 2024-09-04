import React, { useCallback } from 'react';
import NavBar from '../navbar/NavBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllBooksApi } from '../../services/BookServices';
import { getAllBooks } from '../../store/BookListSlice';
import { Outlet } from 'react-router-dom';

function Dashboard() {

  const dispatch = useDispatch()
  
  const fetchBooks = useCallback(async() => {
      const res = await getAllBooksApi()
      const list = res?.data?.result
      dispatch(getAllBooks(list))
  }, [dispatch])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <div>
      <NavBar />
      <Outlet/>
    </div>
  );
}

export default Dashboard;
