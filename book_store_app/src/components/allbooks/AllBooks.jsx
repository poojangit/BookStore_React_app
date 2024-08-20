import React from 'react';
import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './AllBooksSection.scss'
import Books from '../books/Books';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { Store } from '@mui/icons-material';
// import BookStore from '../../bookstore/BookStore';

function AllBooks() {
    const [bookList, setBookList] = useState([])
    const BookListDetails = useSelector((store) => store.allBookStore.AllBooks || [])
    const [bookCount, setBookCount] = useState(bookList.length)
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setSortValue] = useState('');
    const itemsPerPage = 8;


    useEffect(() => {
        if (BookListDetails.length) {
            setBookCount(BookListDetails.length);
            setBookList(BookListDetails);
        }
    }, [BookListDetails]);


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const handleSortChange = (event) => {
        setSortValue(event.target.value); // Update the state with selected value
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = bookList.slice(startIndex, endIndex);


    return (
        <>
            <div className='allbooks-count-sort-main-cnt'>
                <div className='allbooks-count-sort-opt-cnt'>
                    <div className='allbooks-total-count-cnt'>
                        <p className='allbooks-book-text'>Books</p>
                        <p className='allbooks-book-count-text'>({bookCount} items)</p>
                    </div>
                    <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Sort by relevance</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={sortValue} // Use the state variable
                            onChange={handleSortChange} // Update the state on change
                            label="Sort by relevance"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'low to high'}>Price: Low to High</MenuItem>
                            <MenuItem value={'high to low'}>Price: High to Low</MenuItem>
                            <MenuItem value={'new arrival'}>Newest Arrivals</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="allbooks-main-cnt">
                    {paginatedBooks?.map((book, key) => (
                        <Books bookDetails={book} key={key} />
                    ))}
                    <Books />
                </div>
                <Stack spacing={5}>
                    <Pagination count={10} shape="rounded" onChange={handlePageChange} style={{ justifyContent: "center", margin: "30px 0px 40px 0px" }} />
                </Stack>
            </div>
        </>
    );
}

export default AllBooks;
