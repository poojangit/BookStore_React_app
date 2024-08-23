import { React, useState } from 'react';
import { useEffect } from "react";
import './MyOrders.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bookImage from '../../assets/book_image1.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItemsFromMyOrderList } from '../../store/MyOrderListSlice';


function MyOrders() {
  const navigate = useNavigate()
  console.log("Hello");
  const hii = [];
  console.log(hii);

  const myOrderListDetails = useSelector(store => store.myOrderListDetails?.myOrderListItems)
  console.log(myOrderListDetails);
  const [myOrderList, setMyOrderList] = useState(myOrderListDetails)
  const [myOrderListCount, setMyOrderListCount] = useState(myOrderList.length)

  useEffect(() => {
    setMyOrderList(myOrderListDetails)
    setMyOrderListCount(myOrderListDetails.length)
  }, [myOrderListDetails])


  return (
    <>
      <div className='myorders-main-cnt'>
        <div className='myorders-home-profile-opt-cnt'>
          <p className='myorders-home-cnt' onClick={() => navigate('/')}>Home /</p>
          <p className='myorders-profile-cnt' onClick={() => navigate('/myorders')}>My Orders</p>

        </div>
        <div className="myorders-container-inner-cnt">
          <div className="myorders-header-main-cnt">
            <h1 className="myorders-title">My Orders({myOrderListCount})</h1>
          </div>
          {myOrderList.length > 0 ? (
            myOrderList.map((book, index) => {
              const orderDate = new Date(book.order_date); // Assuming you saved the date as 'order_date'
              const formattedDate = `${orderDate.toLocaleString('default', { month: 'long' })} ${orderDate.getDate()}, ${orderDate.getFullYear()}`;

              return (
                <div key={index} className="myorders-items-main-cnt">
                  <div className="myorders-items-main-info-cnt">
                    <div className="myorders-items-main-info-img-cnt">
                      <img src={bookImage} alt="Book cover" />
                    </div>
                    <div className="myorders-items-main-info-txt-cnt">
                      <p id='myorders-book-id'> Product Id : {book.product_id}</p>
                      <p id="myorders-book-name-btn">{book.product_name}</p>

                      <div className="myorders-item-details">
                      <span id="myorders-item-discountedPrice">Rs.{book.product_price}</span>
                      <p id= "myorders-book-qnty"> Qunantity : {book.product_quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="wishlist-items-main-quantity-cnt">
                    <p id="order-item-ordered-date">Order on {formattedDate}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </div >
    </>
  );
}

export default MyOrders;
