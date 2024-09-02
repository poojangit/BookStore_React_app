import { createSlice } from "@reduxjs/toolkit";

const WishListSlice = createSlice({
    name : "wishList",
    initialState : {
        wishListItems : [],
    },
    reducers : {
        getWishList: (state,action) => {
            state.wishListItems=action.payload
        },
        setWishList: (state, action) => {
            state.wishListItems = action.payload;
        },
        addItemToWishList: (state, action) => {
            const itemExists = state.wishListItems.some(item => item._id === action.payload._id);
            if (!itemExists) {
                state.wishListItems.push(action.payload);
            }
        },
        deleteItemFromWishList: (state, action) => {
            state.wishListItems = state.wishListItems.filter((wishList) => wishList._id !== action.payload._id)
        }
    }
})
export const {getWishList, addItemToWishList, deleteItemFromWishList, setWishList} = WishListSlice.actions;
export default WishListSlice.reducer