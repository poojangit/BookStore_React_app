
import { createSlice } from "@reduxjs/toolkit";

const BookSearchSlice = createSlice ({
    name : 'searchbooks',
    initialState : {
        searchBookValue : '',
    },
    reducers: {
        addSearchBookValue : (state, action) => {
            state.searchBookValue = action.payload
        }
    }
})

export const {addSearchBookValue} = BookSearchSlice.actions
export default BookSearchSlice.reducer