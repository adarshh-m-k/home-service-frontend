import React, { useEffect, useState } from 'react'
import './Service.css'
import { Apidata } from '../BaseApi'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { setServiceJob } from '../Redux/Redux';
function Service() {

    let [getData, setGetData] = useState([])

    let [getReview, setGetReview] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                let result = await Apidata.get('/service/get-data')
                console.log(result.data);
                setGetData(result.data.data)

            } catch (error) {

            }
        })()
    }, [])


    let dispatch = useDispatch()
    function bookNow(obj) {

        dispatch(setServiceJob(obj))

        navigate(`/singleservice`)

    }

    useEffect(() => {
        (async () => {
            try {
                let review = await Apidata.get('/review/getreview')
                console.log(review.data);
                setGetReview(review.data)

            } catch (error) {

            }
        })()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,

    };
    return (
        <div className='main-container'>
            <header>
                <div className='header-cont'>
                    <div className='header-writing' >
                        <h1>Service</h1>
                        <p>Home / Services</p>

                    </div>
                </div>
            </header>
            <section>
                <div className='service-sect2-top'>
                    <div className='service-sect2-top-writing' >
                        <h4>CERTIFIED SERVICES</h4>
                        <h1>Our Unique &<br></br>
                            EXceptional Services</h1>
                    </div>
                    <div></div>
                </div>
                <hr className='service-hr' />
                <div className='job-maping-container'>
                    {
                        getData.length === 0 ? (
                            <p>Loading...</p>
                        ) : (
                            getData.map((objData, index) => {
                                return (
                                    <div className='maping-jobs' key={index}>

                                        <img src={objData.images[0]} alt="" style={{ height: '350px', width: '420px', borderRadius: '30px' }} />

                                        <h1>{objData.job}</h1>
                                        <p>{objData.discription}</p>

                                        <div className='service-book'>
                                            <button onClick={() => bookNow(objData)}>Book Now</button>
                                        </div>
                                        <hr style={{ margin: '30px 0px 0px 0px ' }} />


                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </section>
            <section>
                <div className='service-sect3-container'>
                    <div className='service-sect3-top'>
                        <div className='service-sect3-top-left'>
                            <p>TESTIMONIALS</p>
                            <h1>Read Satisfied Clients<br></br>
                                Reviews</h1>
                        </div>
                        <div className='service-sect3-top-right'>
                            <p>We’re dedicated to delivering quality and customer<br></br>
                                satisfaction, constantly improving based on our<br></br>
                                clients' trust and feedback.</p>
                        </div>
                    </div>
                    <div className='service-sect3-bottum'>
                        <Slider {...settings}>
                            {
                                getData.length === 0 ? (
                                    <p>Loading...</p>
                                ) : (
                                    getReview.map((objReview, index) => {
                                        return (
                                            <div key={index} className='review-cont'>

                                                <div className='review-details'>
                                                    <h1>{objReview.reviewName}</h1>
                                                    <p>{objReview.reviewDetail}</p>
                                                </div>
                                                <div className='review-img'>
                                                    <img src={objReview.reviewImg} alt="reviewer" style={{ borderRadius: '180px', width: '130px' }} />
                                                </div>

                                            </div>
                                        )

                                    }))
                            }
                        </Slider>

                    </div>
                </div>
            </section>
        </div>
    )
}


export default Service