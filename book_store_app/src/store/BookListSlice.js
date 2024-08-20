import { createSlice } from "@reduxjs/toolkit";

const BookListSlice = createSlice({
    name : "books",
    initialState : {
       AllBooks : [],
    },
    reducers: {
        getAllBooks: (state, action) => {
            state.AllBooks = action.payload;
        }
    }
})

export const { getAllBooks } = BookListSlice.actions
export default BookListSlice.reducer