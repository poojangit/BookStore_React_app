import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, emptyCart, increaseQuantity, removeQuantity } from "../../store/CartSlice";
import Button from '@mui/material/Button';
import "./Cart.scss";
import bookImage from '../../assets/book_image1.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { placeOrderApi, removeCartApi, updateCartApi } from "../../services/BookServices";
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import orderImg from '../../assets/orderplaced.png';
import { getMyOrderList } from '../../store/MyOrderListSlice';

function Cart() {
    const token = localStorage.getItem('token');
    const cartDetailsList = useSelector(store => store.allCartDetails?.cartDetails);
    console.log(cartDetailsList);
    const [location, setLocation] = useState('');
    const [cartDetails, setCartDetails] = useState(cartDetailsList);
    const [cartCount, setCartCount] = useState(cartDetailsList.length);
    const [LoginModalOpen, setLoginModalOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState(false);
    const [orderDetails, setOrderDetails] = useState(false);
    const [cart, setCart] = useState(true);
    const [fullname, setFullname] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [errorObj, setErrorObj] = useState({
        fullnameError: '',
        mobileNumberError: '',
        addressError: '',
        cityError: '',
        stateError: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCartCount(cartDetailsList.length);
        setCartDetails(cartDetailsList);
    }, [cartDetailsList]);

    const validateFields = () => {
        let isValid = true;
        const newErrorObj = {
            fullnameError: '',
            mobileNumberError: '',
            addressError: '',
            cityError: '',
            stateError: ''
        };

        if (!fullname.match(/^[a-zA-Z\s]+$/)) {
            newErrorObj.fullnameError = 'Please enter a valid full name';
            isValid = false;
        }

        if (!mobileNumber.match(/^[6-9]\d{9}$/)) {
            newErrorObj.mobileNumberError = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        }

        if (!address.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) {
            newErrorObj.addressError = 'Please enter a valid address';
            isValid = false;
        }

        if (!city.match(/^[a-zA-Z\s]+$/)) {
            newErrorObj.cityError = 'Please enter a valid city';
            isValid = false;
        }

        if (!state.match(/^[a-zA-Z\s]+$/)) {
            newErrorObj.stateError = 'Please enter a valid state';
            isValid = false;
        }

        setErrorObj(newErrorObj);
        return isValid;
    };

    async function handleCartAction(action, book) {
        const updatedQuantity = action === 'decreaseQuantity' ? book.quantityToBuy - 1 : book.quantityToBuy + 1;
        const bookToUpdate = { ...book, quantityToBuy: updatedQuantity };
        if (action !== 'removeQuantity') {
            if(token) {
                console.log("Updating cart item quantity:", updatedQuantity);
                await updateCartApi(book._id, updatedQuantity);
            }
            action === 'decreaseQuantity' ? dispatch(decreaseQuantity(bookToUpdate)) : dispatch(increaseQuantity(bookToUpdate));
        } else {
            if (token) {
                console.log("Removing item with ID:", book._id);
               const res = await removeCartApi(book._id);
               console.log(res);
            }
            dispatch(removeQuantity(book));
        }
    }
    async function handleClick(action) {
        if (action === 'continue') {
            if (!validateFields()) return;
            setOrderDetails(true);
        }

        if (action === 'checkout') {
            const orderList = cartDetailsList.map(book => ({
                product_id: book._id,
                product_name: book.bookName,
                product_quantity: book.quantityToBuy,
                product_price: book.discountPrice,
                order_date: new Date().toISOString()
            }));

            const res = await placeOrderApi({ orders: orderList });
            if (res.data.message === "Order successfully placed!!!") {
                setCart(false);
                dispatch(emptyCart());
                dispatch(getMyOrderList(orderList));
                // navigate('/myorders')
            }
        }

        if (action === "continueShopping") {
            setCart(true);
            navigate('/');
        }
    }
    const openLoginModal = () => setLoginModalOpen(true)

    const handlePlaceOrder = () => {
        if (!token) {
            openLoginModal()
        } else {
            setCustomerDetails(true)
        }
    };
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        backgroundColor: '#F5F5F5',
        border: '1px solid #E2E2E2'

    }));

    function BpRadio(props) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#A03037',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&::before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#A03037',
        },
    });

    return (
        <>
            {cart ? <>
                <div className="cart-main-cnt">
                    <div className='cart-home-or-my-cart-cnt'>
                        <p className='home-cnt' onClick={() => navigate('/')}>Home /</p>
                        <p className='my-cart-cnt'>My Cart </p>
                    </div>
                    <div className="cart-container-inner-cnt">
                        <div className="cart-header-main-cnt">
                            <h1 className="cart-title">My Cart ({cartCount})</h1>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small" id="demo-select-small-label-cart">
                                <InputLabel id="demo-select-small-label"><PlaceIcon id="demo-select-small-label-location-logo" /> Use Current Location</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Sort by relevance "
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                >
                                    <MenuItem value={1}>Bengaluru</MenuItem>
                                    <MenuItem value={2}>Manglore</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {cartDetails?.map((book, key) =>
                            <div key={key} className="cart-items-main-cnt">
                                <div className="cart-items-main-info-cnt">
                                    <div className="cart-items-main-info-img-cnt">
                                        <img src={bookImage} alt="" />
                                    </div>
                                    <div className="cart-items-main-info-txt-cnt">
                                        <p id="cart-book-name-btn">{book.bookName}</p>
                                        <p id="cart-book-author-btn">{book.author}</p>
                                        <div className="cart-item-details">
                                            <span id="cart-item-discountedPrice">Rs.{book.discountPrice}</span>
                                            <span id="cart-item-originalPrice">Rs.{book.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-items-main-quantity-cnt">
                                    <div className="cart-quantityControl-ctn">
                                        <button id="cart-decrease-btn" onClick={() => handleCartAction('decreaseQuantity', book)}><RemoveIcon /></button>
                                        <span id="cart-quantity-btn">{book.quantityToBuy}</span>
                                        <button id="cart-increase-btn" onClick={() =>handleCartAction('increaseQuantity', book)}><AddIcon /></button>
                                    </div>
                                    <Button variant="contained" onClick={() => handleCartAction('removeQuantity', book)} id="cart-remove-btn">Remove</Button>
                                </div>
                            </div>
                        )}
                        <div className="cart-actions-main-cnt">
                            {!customerDetails && <Button variant="contained" id="cart-place-order-btn" onClick={() => handlePlaceOrder()}>PLACE ORDER</Button>
                            }
                        </div>
                    </div>
                    {customerDetails ?
                        <div className="cart-address-details-main1-cnt">
                            <div className="cart-address-details-customer-txt-btn-cnt">
                                <p>Customer Details</p>
                                <Button variant="outlined" id='cart-address-details-customer-btn' ><p>Add New Address</p></Button>
                            </div>
                            <div className="cart-address-details-customer-name-num-inp-cnt">
                                <div className="cart-address-details-customer-name-inp-cnt">
                                    <p>Full Name</p>
                                    <TextField
                                        // label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        error={!!errorObj.fullnameError}
                                        helperText={errorObj.fullnameError}
                                    />
                                </div>
                                <div className="cart-address-details-customer-name-inp-cnt">
                                    <p>Mobile Number</p>
                                    <TextField
                                        // label="Mobile Number"
                                        variant="outlined"
                                        fullWidth
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        error={!!errorObj.mobileNumberError}
                                        helperText={errorObj.mobileNumberError}
                                    />
                                </div>
                            </div>
                            <div className="cart-address-details-customer-address-main-cnt">
                                <div className="cart-address-details-customer-address-txt1-cnt">
                                    <p id="cart-address-details-customer-address-txt1 ">1.Work</p>
                                    {/* <p id="cart-address-details-customer-address-txt2">Edit</p> */}
                                </div>
                                <div className="cart-address-details-customer-address-inner-cnt">
                                    <p>Address</p>
                                    <TextField
                                        // label="Address"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        error={!!errorObj.addressError}
                                        helperText={errorObj.addressError}
                                    />
                                </div>
                                <div className="cart-address-details-customer-name-num-inp-cnt address-city-state-cnt">
                                    <div className="cart-address-details-customer-name-inp-cnt">
                                        <p>City/town</p>
                                        <TextField
                                            // label="City/Town"
                                            variant="outlined"
                                            fullWidth
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            error={!!errorObj.cityError}
                                            helperText={errorObj.cityError}
                                        />
                                    </div>
                                    <div className="cart-address-details-customer-name-inp-cnt">
                                        <p>State</p>
                                        <TextField
                                            // label="State"
                                            variant="outlined"
                                            fullWidth
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            error={!!errorObj.stateError}
                                            helperText={errorObj.stateError}
                                        />
                                    </div>
                                </div>
                            </div>
                            <FormControl sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '20px' }} >
                                <FormLabel id="type-txt" sx={{ color: "black", marginBottom: '10px' }}>Type</FormLabel>
                                <RadioGroup
                                    row
                                    defaultValue="work"
                                    aria-labelledby="demo-customized-radios"
                                    name="customized-radios"
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: '20px',
                                        },
                                    }}
                                >
                                    <FormControlLabel value="home" control={<BpRadio />} label="Home" />
                                    <FormControlLabel value="work" control={<BpRadio />} label="Work" />
                                    <FormControlLabel value="other" control={<BpRadio />} label="Other" />
                                </RadioGroup>
                            </FormControl>

                            <div className="cart-address-details-customer-address-last-btn-cnt">
                                {!orderDetails && <Button variant="contained" id="cart-place-order-btn" onClick={() => handleClick("continue")}>Continue</Button>
                                }
                            </div>
                        </div>
                        :
                        <div className="cart-address-details-main-cnt">Address Details</div>
                    }
                    {orderDetails ?
                        <div className="cart-order-details-main1-cnt">
                            <p id="cart-order-summery-main-txt">Order Summery</p>
                            {cartDetails?.map((book, key) =>
                                <div key={key} className="cart-items-main-cnt">
                                    <div className="cart-items-main-info-cnt">
                                        <div className="cart-items-main-info-img-cnt">
                                            <img src={bookImage} alt="" />
                                        </div>
                                        <div className="cart-items-main-info-txt-cnt">
                                            <p id="cart-book-name-btn">{book.bookName}</p>
                                            <p id="cart-book-author-btn">{book.author}</p>
                                            <div className="cart-item-details">
                                                <span id="cart-item-discountedPrice">Rs.{book.discountPrice * book.quantityToBuy}</span>
                                                <span id="cart-item-originalPrice">Rs.{book.price * book.quantityToBuy}</span>
                                                
                                            </div>
                                            <p id = "cart-item-totalQuantity" > Total Quantity : {book.quantityToBuy}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="cart-order-details-btn-cnt">
                                <Button variant="contained" id="cart-place-order-btn" onClick={() => handleClick("checkout")}>CHECKOUT</Button>
                            </div>
                        </div>
                        :
                        <div className="cart-order-details-main-cnt">Order Summary</div>
                    }
                </div>

            </>
                :
                <>
                    <div className="cart-order-img-main-cnt">
                        <img src={orderImg} alt="" />
                    </div>
                    <div className="order-placed-id-text">
                        <p >hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..</p>
                    </div>
                    <div className="cart-main-cnt order-main-cnt">
                        <div className="cart-main-cnt-contact-main-cnt">
                            <div className="order-cnt-main-txt">
                                <p id="order-cnt-email-txt">Email us</p>
                                <p id="order-cnt-contact-txt">Contact us</p>
                                <p id="order-cnt-address-txt">Address</p>
                            </div>
                            <div className="order-cnt-main-txt-info-cnt">
                                <div className="order-cnt-main-txt-email-cnt">
                                    <p>admin@bookstore.com</p>
                                </div>
                                <div className="order-cnt-main-txt-num-cnt">
                                    <p>+91 8163475881</p>
                                </div>
                                <div className="order-cnt-main-txt-address-cnt">
                                    <p>42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</p>
                                </div>
                            </div>

                        </div>

                        <div className="order-cnt-main-continue-btn-cnt">
                            <Button variant="contained" id="cart-place-order-btn" onClick={() => handleClick("continueShopping")}>CONTINUE SHOPING</Button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Cart;
