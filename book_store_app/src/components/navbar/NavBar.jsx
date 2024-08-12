import React from 'react';
import booklogo from '../../assets/education.svg'
import './NavBar.scss'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Menu from '@mui/material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Button from '@mui/material/Button';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FCFCFC',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '490px;',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        // width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));
function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const token = localStorage.getItem('token')
    // console.log(token);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
      }

    return (
        <>
            <div className='navbar-main-cnt'>
                <div className='navbar-logo-search-main-cnt'>
                    <div className='navbar-logo-main-cnt'>
                        <img src={booklogo} alt=''></img>
                        <p>Bookstore</p>
                    </div>
                    <div className='navbar-search-main-cnt'>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon className='search-icon' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                </div>

                <div className='navbar-profile-cart-main-cnt'>
                    <div className='navbar-profile-main-cnt' onClick={handleClick}>
                        <PersonOutlineOutlinedIcon className='profile-icon' />
                        <p>Profile</p>
                    </div>
                    <Menu
                        id="navbar-profile-main-cnt"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {token ? (
                            <div className='profile-after-login-cnt'>
                                <p className='profile-after-login-welcome-txt'>Hello,</p>

                                <div className='profile-after-login-icon-cnt'>
                                    <PersonOutlineOutlinedIcon style={{
                                        color : '#878787'
                                    }}/>
                                    <p>Profile</p>
                                </div>
                                <div className='profile-after-login-icon-cnt'>
                                    <MarkunreadMailboxOutlinedIcon style={{
                                        color : '#878787'
                                    }}/>
                                    <p>My Orders</p>
                                </div>
                                <div className='profile-after-login-icon-cnt'>
                                    <FavoriteBorderOutlinedIcon style={{
                                        color : '#878787'
                                    }}/>
                                    <p>My Wishlist</p>
                                </div>

                                <Button variant="outlined" style={{
                                    borderColor: '#A03037' , 
                                    color: '#A03037' 
                                }} className='after-login-logout-btn' onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div className='profile-before-login-cnt'>
                                <p className='profile-before-login-welcome-txt'>Welcome</p>
                                <p className='profile-before-login-txt'>To access account and manage orders</p>
                                <Button variant="outlined" style={{
                                    borderColor: '#A03037' , 
                                    color: '#A03037' 
                                }} className='before-login-logout-btn' onClick={handleLogout}>Login/signup</Button>
                                <hr/>
                                <div className='profile-before-login-icon-cnt'>
                                    <MarkunreadMailboxOutlinedIcon style={{
                                        color : '#878787',
                                         width : '18'
                                    }}/>
                                    <p className='profile-before-login-txt'>My Orders</p>
                                </div>
                                <div className='profile-before-login-icon-cnt'>
                                    <FavoriteBorderOutlinedIcon style={{
                                        color : '#878787',
                                        width : '18'
                                    }}/>
                                    <p className='profile-before-login-txt' >My Wishlist</p>
                                </div>
                            </div>
                        )}

                    </Menu>

                    <div className='navbar-cart-main-cnt'>

                        <ShoppingCartOutlinedIcon className='cart-icon' />
                        <p>Cart</p>

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default NavBar;
