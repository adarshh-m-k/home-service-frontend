import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { Apidata } from '../BaseApi';
import { setUser } from '../Redux/Redux';
import { useDispatch } from 'react-redux';

function Login() {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [data, setData] = useState({
        email: "",
        password: ""
    })

    let correctPassword = ""

    function loginFctn(e) {
        let { name, value } = e.target;
        console.log(e.target);

        setData(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    function loginBtn() {
        if (!data.email || !data.password) {
            alert('Fill all Information')
            return;
        }

        let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailReg.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (data.password.length < 6) {
            alert('Password must be at least 6 characters long')
            return;
        }

        Apidata.post('/user/login', data).then((result) => {
            console.log(result);

            const user = result.data.data

            dispatch(setUser(user))

            navigate('/home')


        }).catch((error) => {
            console.log(error);


        })
    }
    return (
        <div className='login-main-container'>

            <div className='login-left-container'>
                <div className='login-input-container'>
                    <div className='login'>
                        <h1>Login</h1>
                    </div>
                    <div className='lgn-inpt-eml'>
                        <p>Email address</p>
                        <i className="fa-solid fa-envelope"></i>
                        <input type="email"
                            placeholder='test@gmail.com'
                            name='email'
                            value={data.email}
                            onChange={loginFctn} />
                    </div>
                    <div className='lgn-inpt-pass'>
                        <p>Password</p>
                        <i className="fa-solid fa-lock"></i>
                        <input type="password"
                            placeholder='******'
                            name='password'
                            value={data.password}
                            onChange={loginFctn} />
                    </div>
                    <div className='login-btn'>
                        <button onClick={loginBtn}>Login</button>
                    </div>
                    <div className='dont-have-account'>
                        Don't have an account?<Link to={'signup'}>Create account</Link>
                    </div>
                </div>

            </div>
            <div className='login-right-container'>
                <div className='login-text'>
                    <h2>Home Service</h2>
                    <p>"Expert Solutions for Every Corner of Your Home."
                    </p>

                </div>
            </div>

        </div>
    )
}

export default Login