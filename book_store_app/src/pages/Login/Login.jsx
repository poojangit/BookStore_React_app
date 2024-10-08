
import * as React from 'react';
import Box from '@mui/material/Box';
import loginImg from "../../assets/login-signup-img.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginPost, RegisterPost } from '../../services/UserServices';
import './Login.scss'

function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginObj, setLoginObj] = React.useState({
        email: '',
        password: ''
    })
    const [signupObj, setSignupObj] = React.useState({
        fullName: '',
        email: '',
        password: '',
        mobileNumber: ''
    });

    const [errLoginObj, setErrLoginObj] = React.useState({
        emailError: '',
        passwordError: ''
    });
    const [errSignUpObj, setErrSignUpObj] = React.useState({
        fullNameError: '',
        emailError: '',
        passwordError: '',
        mobileNumberError: ''
    })

    const isLogin = location.pathname === '/login'

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginObj((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setSignupObj((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    };

    const handleChangePassword = (e) => {
        const { value } = e.target
        if (isLogin) {
            setLoginObj((prev) => ({
                ...prev,
                password: value
            }))
        } else {
            setSignupObj((prev) => ({
                ...prev,
                password: value
            }))
        }
    };
    const handleLogin = () => {
        let isValidField = true;
        const newErrObj = {
            emailError: '',
            passwordError: ''
        };

        if (!loginObj.email) {
            newErrObj.emailError = 'Please enter your email';
            isValidField = false;
        }

        if (!loginObj.password) {
            newErrObj.passwordError = 'Please enter your password';
            isValidField = false;
        }

        setErrLoginObj(newErrObj);
        if (isValidField) {
            console.log(loginObj);
            LoginPost(loginObj).then((response) => {
                console.log(response);
                const token = response.data.result.accessToken;
                console.log(token);
                localStorage.setItem("token", token);
                console.log('Login success');
                navigate('/')

                console.log(token);
            })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleSignUp = () => {
        let isValidField = true;
        const newErrObj = {
            fullNameError: '',
            emailError: '',
            passwordError: '',
            mobileNumberError: ''
        };

        if (!signupObj.fullName) {
            newErrObj.fullNameError = 'Please enter your full name';
            isValidField = false;
        }

        if (!signupObj.email) {
            newErrObj.emailError = 'Please enter your email';
            isValidField = false;
        }

        if (!signupObj.password) {
            newErrObj.passwordError = 'Please enter your password';
            isValidField = false;
        }

        if (!signupObj.mobileNumber) {
            newErrObj.mobileNumberError = 'Please enter your mobile number';
            isValidField = false;
        }

        setErrSignUpObj(newErrObj);

        if (isValidField) {
            console.log(isValidField);
            RegisterPost(signupObj)
                .then((response) => {
                    console.log(response);
                    console.log('Signup success');
                    // setIsLogin(true)
                    navigate('/login')
                })
                .catch((error) => {
                    console.log("Error", error);
                })

        }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { sm: 600 },
        height: { xs: 'auto', sm: 310 },
        bgcolor: '#F5F5F5',
        borderRadius: '20px',
        boxShadow: 24,
        padding: { xs: '20px', sm: '20px 0 20px 40px' },
    };

    return (
        <Box sx={style}>
            <div className='main-form-cnt'>
                <div className='login-signup-img-cnt'>
                    <img src={loginImg} alt=''></img>
                    <p>ONLINE BOOK SHOPPING</p>
                </div>
                <div className='login-signup-form-cnt'>
                    <div className='login-signup-head-cont'>
                        <p
                            className={isLogin ? 'active' : ''}
                            onClick={() => handleNavigation('/login')}
                        >
                            LOGIN
                        </p>
                        <p
                            className={!isLogin ? 'active' : ''}
                            onClick={() => handleNavigation('/signup')}
                        >
                            SIGNUP
                        </p>
                    </div>
                    {isLogin ? (
                        <>
                            <div className='email-cnt'>
                                <p>Email Id</p>
                                <TextField
                                    error={!!errLoginObj.emailError}
                                    name="email"
                                    id="email"
                                    label=""
                                    variant="outlined"
                                    value={loginObj.email}
                                    onChange={handleChange}
                                    helperText={errLoginObj.emailError}
                                    inputProps={{ style: { height: 10 } }}
                                />
                            </div>
                            <div className='password-cnt'>
                                <p className='password-cnt-txt'>Password</p>
                                <TextField
                                    error={!!errLoginObj.passwordError}
                                    name="password"
                                    id="password"
                                    label=""
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginObj.password}
                                    onChange={handleChangePassword}
                                    helperText={errLoginObj.passwordError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{ style: { height: 10 } }}
                                />
                                <p className='forgot-txt' style={{ pointerEvents: 'none', opacity: 0.5 }}> Forgot Password</p>
                            </div>
                            <Button style={{
                                backgroundColor: '#A03037',
                                color: '#FFFFFF',
                                textTransform: 'none'
                            }} onClick={handleLogin} >Login</Button>
                            <div className='or-cnt'>
                                <hr className='left-hori-line-cnt'></hr>
                                <p>OR</p>
                                <hr className='left-hori-line-cnt' ></hr>
                            </div>

                            <div className='facebook-google-btn-cnt'>
                                <Button style={{
                                    backgroundColor: '#4266B2',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    minWidth: '135px'
                                }}>Facebook</Button>
                                <Button style={{
                                    backgroundColor: '#F5F9F5',
                                    color: 'black',
                                    border: '2px solid #E4E4E4',
                                    textTransform: 'none',
                                    minWidth: '135px'
                                }}>Google</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='full-name-cnt'>
                                <p>Full Name</p>
                                <TextField
                                    error={!!errSignUpObj.fullNameError}
                                    name="fullName"
                                    id="fullName"
                                    label=""
                                    variant="outlined"
                                    value={signupObj.fullName}
                                    onChange={handleChange}
                                    helperText={errSignUpObj.fullNameError}
                                    inputProps={{ style: { height: 8 } }}
                                />
                            </div>
                            <div className='email-cnt'>
                                <p>Email Id</p>
                                <TextField
                                    error={!!errSignUpObj.emailError}
                                    name="email"
                                    id="email"
                                    label=""
                                    variant="outlined"
                                    value={signupObj.email}
                                    onChange={handleChange}
                                    helperText={errSignUpObj.emailError}
                                    inputProps={{ style: { height: 8 } }}
                                />
                            </div>
                            <div className='password-cnt'>
                                <p className='password-cnt-txt'>Password</p>
                                <TextField
                                    error={!!errSignUpObj.passwordError}
                                    name="password"
                                    id="password"
                                    label=""
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={signupObj.password}
                                    onChange={handleChangePassword}
                                    helperText={errSignUpObj.passwordError}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{ style: { height: 8 } }}
                                />
                            </div>
                            <div className='mbl-num-cnt'>
                                <p>Mobile Number</p>
                                <TextField
                                    error={!!errSignUpObj.mobileNumberError}
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    label=""
                                    variant="outlined"
                                    value={signupObj.mobileNumber}
                                    onChange={handleChange}
                                    helperText={errSignUpObj.mobileNumberError}
                                    inputProps={{ style: { height: 8 } }}
                                />
                            </div>
                            <Button style={{
                                backgroundColor: '#A03037',
                                color: '#FFFFFF',
                                textTransform: 'none'
                            }} onClick={handleSignUp} >SignUp</Button>

                        </>
                    )}
                </div>
            </div>
        </Box>
    );
}


export default Login;
