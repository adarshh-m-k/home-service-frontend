import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { Apidata } from '../BaseApi'
import { setServiceJob } from '../Redux/Redux'

function Header() {

    let [search, setSearch] = useState(null);
    let [inputValue, setInputValue] = useState('');
    let [menuOpen, setMenuOpen] = useState(false)

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let user = useSelector((state) => state.user.value)

    console.log(user);

    function getData(event) {
        const job = event.target.value
        setInputValue(job);
        if (job === "") {
            setSearch([]);      // clear search results if input is empty
            return;    // do not make an api call
        }

        Apidata.get(`/service/find-data?job=${job}`).then((result) => {

            console.log(result.data.data);
            setSearch(result.data.data.slice(0, 2))

        }).catch((err) => {

            console.log(err);

        })

    }



    function setData(obj) {

        dispatch(setServiceJob(obj))
        navigate(`/singleservice`)

        // it will clr the suggestion
        setSearch([]);

        // it will clr the remaining letter from the input
        setInputValue("");
    }

    return (
        <div>
            <nav className='navbar'>

                <div className='logo'>
                    <h1 onClick={() => { navigate('/home') }} >Home Service</h1>
                </div>

                <div>
                    <input className='search-inpt'
                        type="text"
                        placeholder='Search here'
                        value={inputValue}
                        onChange={getData} />

                    <div className='search'>

                        <div className='search-result'>
                            {
                                search?.map((obj, index) => {
                                    return (
                                        <div key={index} className='search-result-cont' onClick={() => setData(obj)}>
                                            {/* <img src={obj.image} alt="" height={"40px"} width={"40px"} /> */}
                                            <h2>{obj.job}</h2>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                <div className={`navbar-details ${menuOpen ? 'open' : ''}`}>

                    <div className='navbar-list' >
                        <ol>
                            <Link to={'/home'}>Home</Link>
                            <Link to={'/aboutus'}>About Us</Link>
                            <Link to={'/services'}>Services</Link>
                            <Link to={'/contactus'}>Contact</Link>
                            <Link to={'/mybooking'}>My Bookings</Link>
                        </ol>
                    </div>

                    <div className='profile' onClick={() => { navigate('/profile') }}>
                        <h1 style={{ color: 'black', fontSize: '30px' }}>
                            <i className="fas fa-user-circle" ></i>
                        </h1>
                    </div>

                </div>
                <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                    <i className="fas fa-bars"></i>
                </div>

                {/* <h1>{user?.email}</h1> */}
            </nav >
        </div >
    )
}

export default Header