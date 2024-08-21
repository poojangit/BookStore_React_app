import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromWishList } from "../../store/WishListSlice";
import { useEffect, useState } from "react";
import bookImage from '../../assets/book_image1.png'
import DeleteIcon from '@mui/icons-material/Delete';
import "./WishList.scss"
import { useNavigate } from "react-router-dom";
import { removeWishListApi } from "../../services/BookServices";

function WishList() {
    console.log("Hello");
    const hii = [];
    console.log(hii);
    const wishListDetails = useSelector(store => store.wishListDetails?.wishListItems)
    console.log(wishListDetails);
    const [wishList, setWishList]= useState(wishListDetails)
    const [wishlistCount, setWishlistCount] = useState(wishList.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token') 

    useEffect(() => {
        setWishList(wishListDetails)
        setWishlistCount(wishListDetails.length)
    }, [wishListDetails])

    async function handleClick(action, data) {
        if (action === "deleteItemFromWishList") {
            const updatedList =wishList.filter(book=>book._id!==data._id)
            setWishList(updatedList)
            if (token){
                await removeWishListApi(data._id)
            }
            dispatch(deleteItemFromWishList(data))
        }   
    }

    return (
        <>
            <div className="wishlist-main-cnt">
                <div className="wishlist-name-sort-opt-main-cnt">
                    <div className="wishlist-total-count-main-cnt">
                        <p id="wishlist-book-text" onClick={()=>navigate(`/dashboard`)}>Home/</p>
                        <p id="wishlist-total-count">My Wishlist</p>
                    </div>
                </div>
                <div className="wishlist-container-inner-cnt">
                    <div className="wishlist-header-main-cnt">
                        <h1 className="wishlist-title">My Wishlist({wishlistCount})</h1>
                    </div>
                    {wishListDetails?.map((book, key) =>
                        <div key={key} className="wishlist-items-main-cnt">
                            <div className="wishlist-items-main-info-cnt">
                                <div className="wishlist-items-main-info-img-cnt">
                                    <img src={bookImage} alt="" />
                                </div>
                                <div className="wishlist-items-main-info-txt-cnt">
                                    <p id="wishlist-book-name-btn">{book.bookName}</p>
                                    <p id="wishlist-book-author-btn">{book.author}</p>
                                    <div className="wishlist-item-details">
                                        <span id="wishlist-item-discountedPrice">Rs.{book.discountPrice}</span>
                                        <span id="wishlist-item-originalPrice">Rs.{book.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="wishlist-items-main-quantity-cnt">
                                <DeleteIcon id="wishlist-item-delete-logo" onClick={() => handleClick('deleteItemFromWishList', book)}/>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </>
    )
}

export default WishList;