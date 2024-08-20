import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import './Profile.scss'
import { useNavigate } from 'react-router-dom';

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
  
function Profile() {
    const navigate = useNavigate()
    return (
        <>
            <div className='profile-details-main-cnt'>
                <div className='profile-home-profile-opt-cnt'>
                    <p className='profile-home-cnt' onClick = {() => navigate('/')}>Home /</p>
                    <p className='profile-profile-cnt' onClick={() => navigate('/profile')}>Profile</p>
                </div>

                <div className='profile-personal-add-detl-main-cnt'>
                    <div className='profile-personal-detail-cnt'>
                        <div className='personal-detail-edit-cnt'>
                            <p className='personal-detail-name'>Personal Details</p>
                            <p className='personal-detail-edit'>Edit</p>
                        </div>
                        <div className='profile-full-name-main-cnt'>
                            <p className='profile-full-name-cnt'>Full Name</p>
                            <TextField
                                disabled
                                id="full-name"
                                label=""
                                defaultValue="Poonam Yadav"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E2E2E2',
                                    },

                                    '& .MuiInputBase-input': {
                                        color: '#878787',
                                    },

                                }}
                            />
                        </div>

                        <div className='profile-email-id-main-cnt'>
                            <p className='profile-email-cnt'>Email Id</p>
                            <TextField
                                disabled
                                id="email-id"
                                label=""
                                defaultValue="Poonam.Yadav@bridgelabz.com"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E2E2E2',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#878787',
                                    },
                                }}
                            />
                        </div>
                        <div className='profile-password-main-cnt'>
                            <p className='profile-password-cnt'>Password</p>
                            <TextField
                                disabled
                                id="password"
                                label=""
                                type="password"
                                defaultValue="********"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E2E2E2',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#878787',
                                    },
                                }}
                            />
                        </div>
                        <div className='profile-mobile-num-main-cnt'>
                            <p className='profile-mobile-num-cnt'>Mobile Number</p>
                            <TextField
                                disabled
                                id="mobile-num"
                                label=""
                                defaultValue="81678954778"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E2E2E2',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#878787',
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className='profile-address-main-details-cnt'>
                        <div className='profile-address-cnt'>
                            <p className='profile-address-txt'>Address details</p>
                            <Button variant="outlined"
                                sx={{
                                    borderColor: '#A03037',
                                    color: '#A03037',
                                    textTransform: 'none',
                                    fontSize: '0.75rem',
                                    // height : '20px'

                                }}> Add New Address</Button>
                        </div>

                        <div className='profile-work-edit-main-cnt'>
                            <p className='profile-work-cnt'>1.Work</p>
                            <p className='profile-edit-cnt'>Edit</p>
                        </div>

                        <div className='profile-address-main-cnt'>
                            <p className='profile-address-txt'>Address</p>
                            <TextField
                                disabled
                                id="address"
                                label=""
                                multiline
                                rows={4}
                                defaultValue="BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid #E2E2E2',
                                        borderRadius: '4px',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#878787',
                                    },
                                    '& .MuiFormLabel-root': {
                                        color: '#878787',
                                    },
                                }}
                            />
                        </div>

                        <div className='profile-city-state-cnt'>
                            <div className='profile-city-cnt'>
                                <p className='profile-city-town-txt'>city/town</p>
                                <TextField
                                    disabled
                                    id="city-town"
                                    label=""
                                    defaultValue="Bengaluru"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#F5F5F5',
                                            border: '1px solid #E2E2E2',
                                        },

                                        '& .MuiInputBase-input': {
                                            color: '#878787',
                                        },

                                    }}
                                />

                            </div>
                            <div className='profile-state-main-cnt'>
                                <p className='profile-state-cnt'>State</p>
                                <TextField
                                    disabled
                                    id="state"
                                    label=""
                                    defaultValue="Karnataka"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            backgroundColor: '#F5F5F5',
                                            border: '1px solid #E2E2E2',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#878787',
                                        },
                                    }}
                                />

                            </div>
                        </div>

                        <FormControl >
                            <FormLabel id="type-txt" sx={{color: "black", marginTop: '15px'}}>Type</FormLabel>
                            <RadioGroup
                                row
                                defaultValue="work"
                                aria-labelledby="demo-customized-radios"
                                name="customized-radios"
                                sx={{
                                    '& .MuiFormControlLabel-root': {
                                        marginRight: '89px', 
                                    },
                                }}
                            >
                                <FormControlLabel value="home" control={<BpRadio />} label="Home" />
                                <FormControlLabel value="work" control={<BpRadio />} label="Work" />
                                <FormControlLabel value="other" control={<BpRadio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
