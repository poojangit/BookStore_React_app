import React from 'react';
import { useNavigate } from 'react-router-dom';
import bookImage from '../../assets/book_image1.png'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import './Books.scss'
import { useSelector } from 'react-redux';

function Books({ bookDetails , key}) {
    const navigate = useNavigate()
    console.log(bookDetails);
 
    return (
        <>
            <div className='book-main-cnt' key={key} onClick={() => navigate(`/bookdetails/${bookDetails._id}`)}>
                <div className='book-img-cnt'>
                    <img src= {bookImage}/>
                </div>
                <div className='bookdetails-main-cnt'>
                    <p className='bookdetails-book-name'>{bookDetails?.bookName}</p>
                    <p className='bookdetails-author-name'>{bookDetails?.author}</p>
                    <div className='bookdetail-rating-review-cnt'>
                        <p className='bookdetail-rating-cnt'>4.5 <StarOutlinedIcon sx={{color:'white', width: 17}} id='book-details-bookrating-star' /></p>
                        <p className='bookdetail-review-cnt'>({bookDetails?.quantity})</p>
                    </div>
                    <div className='bookdetail-discnt-ori-price-cnt'>
                        <p className='bookdetail-discnt-price'>Rs. {bookDetails?.discountPrice}</p>
                        <p className='bookdetail-actual-price'>Rs.{bookDetails?.price}</p>
                    </div>
                </div>
                 {/* Quick open dialog box */}
                 <div className='quick-open-dialog'>
                    <p>Quick View</p>
                   
                </div>
            </div>
        </>
    );
}

export default Books;
