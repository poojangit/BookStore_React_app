import {configureStore} from '@reduxjs/toolkit'
import BookListSlice from './BookListSlice'
import CartSlice from './CartSlice'
import WishListSlice from './WishListSlice'
import MyOrderListSlice from './MyOrderListSlice'
import BookSearchSlice from './BookSearchSlice'
const BookStore = configureStore({
    reducer : {
        allBookStore : BookListSlice,
        allCartDetails : CartSlice,
        wishListDetails : WishListSlice,
        myOrderListDetails : MyOrderListSlice,
        bookSearchDetails : BookSearchSlice,
    }
})


export default BookStore