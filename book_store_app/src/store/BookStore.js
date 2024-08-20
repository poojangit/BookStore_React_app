import {configureStore} from '@reduxjs/toolkit'
import BookListSlice from './BookListSlice'

const BookStore = configureStore({
    reducer : {
        allBookStore : BookListSlice
    }
})

// console.log(BookStore);
// console.log(configureStore); 

export default BookStore