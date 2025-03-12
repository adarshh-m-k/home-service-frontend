import React, { useState } from 'react'
import { Apidata } from '../BaseApi';
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.css'

function SignUp() {
    let navigate = useNavigate()
    let [list, setList] = useState({
        username: "",
        mobile: "",
        email: "",
        password: ""
    })

    function inputValue(e) {
        let { name, value } = e.target;
        console.log(e.target);

        setList(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    function signUpBtn() {
        if (!list.username || !list.mobile || !list.email || !list.password) {
            alert('Please fill all the information')
            return;
        }
        let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailReg.test(list.email)) {
            alert('Please enter a valid email address');
            return;
        }

        let mobileReg = /^[0-9]{10}$/;
        if (!mobileReg.test(list.mobile)) {
            alert('Please enter a valid mobile number (10 digits)');
            return;
        }

        if (list.password.length < 6) {
            alert('Password must be at least 6 characters long')
            return;
        }


        Apidata.post('/user/sign-up', list).then((result) => {

            console.log(result);
            navigate('/otp')


        }).catch((err) => {
            console.log(err);
            if (err.response) {

                if (err.response.status === 400) {

                    alert('Bad Request. Please check your input.');
                } else if (err.response.status === 404) {

                    alert('User not found or resource unavailable.');
                } else if (err.response.status === 409) {

                    alert('Email or mobile number already in use.');
                } else if (err.response.status === 500) {

                    alert('Internal Server Error. Please try again later.');
                } else {
                    alert(`Error: ${err.response.data.message || 'Something went wrong'}`);
                }
            } else if (err.request) {

                alert('Network error. Please check your internet connection.');
            } else {

                alert('An unexpected error occurred.');
            }


        })

        return;


    }



    return (
        <div className='signup-container'>
            <div className='signup-left-container'>
                <div className='left-container'>
                    <h2>Home service</h2>
                    <p>"Your home, our priority – trusted services, every time."</p>
                </div>
            </div>
            <div className='signup-right-container'>
                <div className='signup'>
                    <h1>Sign up</h1>
                </div>

                <div className='username'>
                    <p>Full name</p>
                    <i className="fa-solid fa-user"></i>
                    <input type="text"
                        name='username'
                        placeholder='Enter your name'
                        value={list.username}
                        onChange={inputValue} />

                </div>

                <div className='mobile'>
                    <p>Phone number</p>
                    <i className="fa-solid fa-phone"></i>
                    <input type="number"
                        name='mobile'
                        placeholder='Enter phone number'
                        value={list.mobile}
                        onChange={inputValue} />

                </div>

                <div className='email'>
                    <p>Email address</p>
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email"
                        name='email'
                        placeholder='test@gmail.com'
                        value={list.email}
                        onChange={inputValue} />

                </div>

                <div className='password'>
                    <p>Password</p>
                    <i className="fa-solid fa-lock"></i>
                    <input type="password"
                        name='password'
                        placeholder='******'
                        value={list.password}
                        onChange={inputValue} />

                </div>
                <div className='submitBtn'>
                    <button onClick={signUpBtn}>SignUp</button>
                </div>
                <div className='already-account'>
                    Already have an account?<Link to={'/'}>Log in</Link>
                </div>

            </div>
        </div>
    )
}

export default SignUp