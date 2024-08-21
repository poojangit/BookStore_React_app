import {configureStore} from '@reduxjs/toolkit'
import BookListSlice from './BookListSlice'
import CartSlice from './CartSlice'
import WishListSlice from './WishListSlice'

const BookStore = configureStore({
    reducer : {
        allBookStore : BookListSlice,
        allCartDetails : CartSlice,
        wishListDetails : WishListSlice,
    }
})


export default BookStore