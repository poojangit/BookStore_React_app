import React from 'react';
import { useNavigate } from 'react-router-dom';
import bookImage from '../../assets/book_image1.png'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import './Books.scss'

function Books({ bookDetails, key }) {
    const navigate = useNavigate()
    return (
        <>
            <div className='book-main-cnt'>
                <div className='book-img-cnt'>
                    <img src= {bookImage}/>
                </div>
                <div className='bookdetails-main-cnt'>
                    <p className='bookdetails-book-name'>Don't Make me Think</p>
                    <p className='bookdetails-author-name'>by Steve krug</p>
                    <div className='bookdetail-rating-review-cnt'>
                        <p className='bookdetail-rating-cnt'>4.5 <StarOutlinedIcon sx={{color:'white', width: 17}} id='book-details-bookrating-star' /></p>
                        <p className='bookdetail-review-cnt'>(20)</p>
                    </div>
                    <div className='bookdetail-discnt-ori-price-cnt'>
                        <p className='bookdetail-discnt-price'>Rs. 1500</p>
                        <p className='bookdetail-actual-price'>Rs.2000</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Books;
