import React, { useEffect, useState } from "react";
import './ViewBook.scss'
import { useNavigate, useParams } from 'react-router-dom';
import bookImage from '../../assets/book_image1.png'
import Button from '@mui/material/Button';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function ViewBook() {
    const navigate = useNavigate()
    const { bookid } = useParams()
    const [value, setValue] = React.useState(2);
    const [rating, setRating] = useState(0)
    const allBooksDetails = useSelector((store) => store.allBookStore.AllBooks || [])

    console.log(allBooksDetails);
    const bookDetails = allBooksDetails.find(book => book._id === bookid)
    console.log(bookid);
    console.log(bookDetails);

    return (
        <>
            <div className='view-book-main-cnt'>
                <div className='view-book-home-or-book-qnty-cnt'>
                    <p className='home-cnt' onClick={() => navigate('/')}>Home /</p>
                    <p className='book-qnty-cnt'>Book </p>
                </div>
                <div className='view-book-inner-main-cnt'>
                    <div className='view-book-img-main-cnt'>
                        <div className='view-book-small-img-cnt'>
                            <div className='view-book-1st-small-img'>
                                <img src={bookImage} />
                            </div>
                            <div className="view-book-2nd-small-img">
                                <img src={bookImage} />
                            </div>
                        </div>
                        <div className='view-book-img-add-wish-cnt'>
                            <div className='view-book-large-img-cnt'>
                                <img src={bookImage} />
                            </div>
                            <div className='view-image-add-wish-opt-cnt'>
                                <Button variant="contained" className="book-view-addtobag-btn">ADD TO BAG</Button>
                                <Button variant="contained" className="book-view-addtobag-btn">WISHLIST</Button>
                            </div>
                        </div>
                    </div>
                    <div className='book-view-details-main-cnt'>
                        <p className='book-view-book-name'>{bookDetails?.bookName}</p>
                        <p className='book-view-author-name'>{bookDetails?.author}</p>
                        <div className='book-view-rating-review-cnt'>
                            <p className='book-view-rating-cnt'>4.5 <StarOutlinedIcon sx={{ color: 'white', width: 17 }} id='book-details-bookrating-star' /></p>
                            <p className='book-view-review-cnt'>({bookDetails?.quantity})</p>
                        </div>
                        <div className='book-view-discnt-ori-price-cnt'>
                            <p className='book-view-discnt-price'>Rs. {bookDetails?.discountPrice}</p>
                            <p className='book-view-actual-price'>Rs.{bookDetails?.price}</p>
                        </div>

                        <hr />
                        <div className="book-view-descrp-cnt">
                            <p> Book Detail</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis vero deleniti cum molestiae. Et porro soluta repudiandae ipsam dolor distinctio natus veritatis ab cumque, autem vel cupiditate est voluptatem magni.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum id tempore, dolores exercitationem animi repellendus possimus deleniti omnis eius veritatis doloribus temporibus iure dolorum cupiditate iusto commodi minus ab optio.
                            </p>
                        </div>
                        <hr />
                        <div className="book-view-cust-feebk-main-cnt">
                            <p>Customer Feedback</p>
                            <div className="book-view-opt-rating-main-cnt">
                                <Typography component="legend">Overall rating</Typography>
                                <Stack spacing={1} id="bookView-customerrating-star-main-cnt">
                                    <Rating name="size-medium" defaultValue={1} onChange={(e) => setRating(e.target.value)} />
                                </Stack>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=""
                                    multiline
                                    rows={4}
                                    placeholder="write your review"
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}

export default ViewBook;
