import {configureStore} from '@reduxjs/toolkit'
import BookListSlice from './BookListSlice'
import CartSlice from './CartSlice'
import WishListSlice from './WishListSlice'
import MyOrderListSlice from './MyOrderListSlice'
const BookStore = configureStore({
    reducer : {
        allBookStore : BookListSlice,
        allCartDetails : CartSlice,
        wishListDetails : WishListSlice,
        myOrderListDetails : MyOrderListSlice,
    }
})


export default BookStore