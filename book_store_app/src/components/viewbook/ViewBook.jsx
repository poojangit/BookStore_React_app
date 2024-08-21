import React, { useEffect, useState } from "react";
import './ViewBook.scss';
import { useNavigate, useParams } from 'react-router-dom';
import bookImage from '../../assets/book_image1.png';
import Button from '@mui/material/Button';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from "react-toastify";
import { addToWishListApi, getFeedbackApi, getAllCartDetailsApi, postFeedbackApi, removeWishListApi, updateCartApi } from "../../services/BookServices";
import { addItemToWishList, deleteItemFromWishList } from "../../store/WishListSlice";
import { addBookToCart, decreaseQuantity, increaseQuantity, updateQuantity } from '../../store/CartSlice';

function ViewBook() {
    const token = localStorage.getItem('token');
    // console.log(token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookid } = useParams();
    const cartDetails = useSelector(store => store.allCartDetails?.cartDetails || []);
    const allBooksDetails = useSelector(store => store.allBookStore?.AllBooks || []);
    const wishListDetails = useSelector(store => store.wishListDetails?.wishListItems || []);
    const bookInCart = cartDetails.find(book => book.product_id?._id === bookid);
    const bookDetail = allBooksDetails.find(book => book._id === bookid);
    const initialQuantity = bookInCart ? bookInCart.quantityToBuy : 0;

    const [bookQuantity, setBookQuantity] = useState(initialQuantity);
    const [addWish, setAddWish] = useState(false);
    const [feedbackList, setFeedbackList] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setBookQuantity(initialQuantity);
    }, [initialQuantity]);

    useEffect(() => {
        const bookExists = wishListDetails.some(book => book._id === bookid);
        setAddWish(bookExists);
    }, [wishListDetails, bookid]);

    useEffect(() => {
        getFeedBack();
    }, [token]);

    async function getFeedBack() {
        if (token) {
            const res = await getFeedbackApi(bookid);
            setFeedbackList(res.data.result);
            console.log(res);
        }
    }

    async function handleClick(action) {
        if (action === 'addbook') {
            const bookToAdd = { ...bookDetail, quantityToBuy: 1 };
            setBookQuantity(1);
            if (token) {
                await handleCartUpdate(bookToAdd, 1);
            }
            dispatch(addBookToCart(bookToAdd));
        }
        if (action === 'decreaseQuantity') {
            if (bookQuantity > 1) {
                const bookToAdd = { ...bookDetail, quantityToBuy: -1 };
                setBookQuantity(bookQuantity - 1);
                if (token) {
                    await handleCartUpdate(bookToAdd, -1);
                }
                dispatch(decreaseQuantity(bookToAdd));
            }
        }
        if (action === 'increaseQuantity') {
            const bookToAdd = { ...bookDetail, quantityToBuy: 1 };
            setBookQuantity(bookQuantity + 1);
            if (token) {
                await handleCartUpdate(bookToAdd, 1);
            }
            dispatch(increaseQuantity(bookToAdd));
        }
        if (action === 'addToWishList') {
            const newAddWish = !addWish;
            setAddWish(newAddWish);
            if (token) {
                if (newAddWish) {
                    await addToWishListApi(bookid);
                    dispatch(addItemToWishList(bookDetail));
                } else {
                    await removeWishListApi(bookid);
                    dispatch(deleteItemFromWishList(bookDetail));
                }
            }
        }
        if (action === "submitfeedback") {
            const newFeedback = {
                "comment": comment,
                "rating": rating
            };
            if (token) {
                const res = await postFeedbackApi(bookid, newFeedback);
                toast.success(res?.data?.message);
                setComment('');
                setRating(0);
                getFeedBack();
            } else {
                toast.error("Please login to submit a review");
            }
        }
    }

    async function handleCartUpdate(bookToAdd, quantityChange) {
        const fetchedCartList = await getAllCartDetailsApi();
        const updatedData = fetchedCartList.find(book => book.product_id._id === bookToAdd._id);
        if (updatedData) {
            dispatch(updateQuantity({ ...bookToAdd, cartId: updatedData._id }));
            await updateCartApi(updatedData._id, quantityChange);
        }
    }

    return (
        <>
            <div className='view-book-main-cnt'>
                <div className='view-book-home-or-book-qnty-cnt'>
                    <p className='home-cnt' onClick={() => navigate('/')}>Home /</p>
                    <p className='book-qnty-cnt'>Book</p>
                </div>
                <div className='view-book-inner-main-cnt'>
                    <div className='view-book-img-main-cnt'>
                        <div className='view-book-small-img-cnt'>
                            <div className='view-book-1st-small-img'>
                                <img src={bookImage} alt="book thumbnail 1" />
                            </div>
                            <div className="view-book-2nd-small-img">
                                <img src={bookImage} alt="book thumbnail 2" />
                            </div>
                        </div>
                        <div className='view-book-img-add-wish-cnt'>
                            <div className='view-book-large-img-cnt'>
                                <img src={bookImage} alt="book large" />
                            </div>
                            <div className='view-image-add-wish-opt-cnt'>
                                {bookQuantity <= 0 ? (
                                    <Button variant="contained" className="book-view-addtobag-btn" sx={{ width: "200px", backgroundColor: "#A03037" }} onClick={() => handleClick('addbook')}>ADD TO BAG</Button>
                                ) : (
                                    <div className="bookView-quantityControl-ctn">
                                        <button id="bookView-decrease-btn" onClick={() => handleClick('decreaseQuantity')}><RemoveIcon /></button>
                                        <span id="bookView-quantity-btn">{bookQuantity}</span>
                                        <button id="bookView-increase-btn" onClick={() => handleClick('increaseQuantity')}><AddIcon /></button>
                                    </div>
                                )}

                                <Button variant="contained" className="book-view-addtobag-btn" sx={{ width: "200px", backgroundColor: "#333333" }} onClick={() => handleClick('addToWishList')}>
                                    <FavoriteIcon sx={{ marginRight: "8px", width: "20px" }} />
                                    {addWish ? 'REMOVE FROM WISHLIST' : 'WISHLIST'}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='book-view-details-main-cnt'>
                        <p className='book-view-book-name'>{bookDetail?.bookName}</p>
                        <p className='book-view-author-name'>{bookDetail?.author}</p>
                        <div className='book-view-rating-review-cnt'>
                            <p className='book-view-rating-cnt'>4.5 <StarOutlinedIcon sx={{ color: 'white', width: 17 }} id='book-details-bookrating-star' /></p>
                            <p className='book-view-review-cnt'>({bookDetail?.quantity})</p>
                        </div>
                        <div className='book-view-discnt-ori-price-cnt'>
                            <p className='book-view-discnt-price'>Rs. {bookDetail?.discountPrice}</p>
                            <p className='book-view-actual-price'>Rs.{bookDetail?.price}</p>
                        </div>

                        <hr />
                        <div className="book-view-descrp-cnt">
                            <p className="book-view-head-title">Book Detail</p>
                            <p className="book-view-para">
                                {bookDetail?.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis vero deleniti cum molestiae. Et porro soluta repudiandae ipsam dolor distinctio natus veritatis ab cumque, autem vel cupiditate est voluptatem magni.'}
                            </p>
                        </div>
                        <hr />
                        <div className="book-view-cust-feebk-main-cnt">
                            <p>Customer Feedback</p>
                            <div className="book-view-opt-rating-main-cnt">
                                <Typography component="legend">Overall rating</Typography>
                                <Stack spacing={1} className="book-view-stack-cnt">
                                    <Rating name="half-rating" value={rating} precision={0.5} onChange={(event, newValue) => setRating(newValue)} />
                                </Stack>
                                <TextField
                                    className="book-view-comment-inpt"
                                    label=""
                                    multiline
                                    rows={4}
                                    placeholder="write your review"
                                    onChange={e => setComment(e.target.value)}
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white', 
                                            borderColor : "none"
                                        },
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none', 
                                            },
                                        },
                                        '& .MuiInputBase-root': {
                                            backgroundColor: 'white', 
                                        },
                                    }}
                                />
                                <div className="book-view-submit-btn">
                                    <Button variant="contained" onClick={() => handleClick('submitfeedback')}>Submit</Button>
                                </div>
                            </div>
                        </div>
                        <div className='book-view-cust-review-main-cnt'>
                            {feedbackList?.map((feedback, index) => (
                                <div key={index} className='book-view-cust-review-cnt'>
                                    <div className='book-view-cust-name-rating-cnt'>
                                        <div className='book-view-cust-name'>{feedback.user_id?.fullName || 'Anonymous'}</div>
                                        <div className='book-view-cust-review-rating'>
                                            <StarOutlinedIcon sx={{ color: 'white', width: 15 }} id='book-details-bookrating-star' />{feedback.rating}
                                        </div>
                                    </div>
                                    <div className='book-view-cust-review-para'>{feedback.comment}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewBook;
