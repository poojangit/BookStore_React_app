import { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartDetails: [],
    },
    reducers: {
        addBookToCart: (state, action) => {
            state.cartDetails.push({ ...action.payload, quantityToBuy: 1 })
        },
        increaseQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...book,
                        quantityToBuy: book.quantityToBuy + 1
                    }
                }
                return book
            })

        },
        decreaseQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id && book.quantityToBuy > 1) {
                    return {
                        ...book,
                        quantityToBuy: book.quantityToBuy - 1
                    }
                }
                return book
            })

        },
        updateQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.map(book => {
                if (book._id === action.payload._id) {
                    return {
                        ...book,
                        quantityToBuy : action.payload.quantityToBuy,
                    }
                }
                return book
            })

        },
        removeQuantity: (state, action) => {
            state.cartDetails = state.cartDetails.filter(book => book._id !== action.payload._id)
        },
        emptyCart: (state) => {
            state.cartDetails = []
        }
    }
})

export const { addBookToCart, increaseQuantity, decreaseQuantity, updateQuantity, removeQuantity, emptyCart } = CartSlice.actions
export default CartSlice.reducer