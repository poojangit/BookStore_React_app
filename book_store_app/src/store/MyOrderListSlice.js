

import {createSlice} from "@reduxjs/toolkit"

const MyOrderListSlice = createSlice ({
        name : "orderList",
        initialState : {
            myOrderListItems : [],
        },
        reducers : {
            getMyOrderList : (state, action) => {
                state.myOrderListItems = action.payload
            },
            addItemToOrderList : (state, action) => {
                const itemExists = state.myOrderListItems.some(item => item._id === action.payload._id)
                if(!itemExists) {
                    state.myOrderListItems = state.myOrderListItems.filter((list) => list._id !== action.payload._id)
                }
            },
            deleteItemsFromMyOrderList : (state, action) => {
                state.myOrderListItems = state.myOrderListItems.filter((list) => list._id !== action.payload._id)
            }
        }
})

export const {getMyOrderList, addItemToOrderList, deleteItemsFromMyOrderList} = MyOrderListSlice.actions
export default MyOrderListSlice.reducer
