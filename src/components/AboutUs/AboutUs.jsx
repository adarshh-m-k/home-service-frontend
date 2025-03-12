import React, { useEffect, useState } from 'react'
import './AboutUs.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Apidata } from '../BaseApi';


const slides = [
    {
        title: "Top Rated Service",
        text: "Delivering exceptional results, every\n time.",
        icons: <i className="fa-regular fa-thumbs-up"></i>
    },
    {
        title: "Timely Services",
        text: "We’re always on time, ensuring your \n convenience.",
        icons: <i className="fa-solid fa-clock-rotate-left"></i>
    },
    {
        title: "Licensed Technicians",
        text: "Skilled professionals you can trust  with \n every job.",
        icons: <i className="fa-regular fa-handshake"></i>

    },
    {
        title: "Quality Services",
        text: "Commitment to excellence in every task \n we handle.",
        icons: <i className="fas fa-cogs"></i>

    },
    {
        title: "Affordable Pricing",
        text: "Quality services that won’t break the \n bank.",
        icons: <i className="fas fa-hand-holding-dollar"></i>



    },
];


function AboutUs() {

    let [getTeam, setGetTeam] = useState(null)

    const settings = {
        infinite: true,   
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,        

    };

    useEffect(() => {
        (async () => {
            try {
                let expertTeam = await Apidata.get('/team/get-team')
                console.log(expertTeam.data.responce);
                setGetTeam(expertTeam.data.responce)

            } catch (error) {
                console.log(error);


            }
        })()
    }, [])
    return (
        <div>
            <header>
                <div className='about-header-cont'>
                    <div className='about-header-writing' >
                        <h1>About Us</h1>
                        <p>Home / About Us</p>

                    </div>
                </div>
            </header>

            {/* about us section one */}

            <section>
                <div className='aboutus-sect1-cont'>

                    <div className='aboutus-sect1-top' >
                        <p>ABOUT US</p>
                        <h1>We Offer Plumbing Work Since 2024</h1>

                    </div>

                    <div className='aboutus-sect1-middle'>
                        <Slider {...settings}>
                            {slides.map((slide, index) => (
                                <div key={index} className='aboutus-middle-slide'>

                                    <div className='aboutus-middle-detail'>
                                        <div className='about-middle-icon'>
                                            <h1>{slide.icons}</h1>
                                        </div>
                                        <div className='about-middle-writing'>
                                            <h2>{slide.title}</h2>
                                            {slide.text.split('\n').map((line, idx) => (
                                                <p key={idx}>{line}</p>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </Slider>
                    </div>

                </div>
            </section >

            {/* section two starts */}

            <section>
                <div className='about-sect2-cont'>

                    <div className='about-sect2-textwith-image'>
                        <h1>HIGH &nbsp;TECH</h1>
                        <img src="src/assets/text-with-img2.jpg" style={{ width: '260px', borderRadius: '40px', margin: '0px 30px 0px 30px' }} alt="image with text" />
                        <h1>INSTALLATION & REPAIR</h1>
                    </div>

                    <div className='about-sect2-textwith-image'>
                        <img src="src/assets/text-with-img3.jpg" style={{ width: '260px', borderRadius: '40px', margin: '0px 30px 0px 0px' }} alt="" />
                        <h1>SERVICES&nbsp; BY&nbsp; PROFESSIONAL</h1>
                        <div className='about-topright-icon1'>
                            <h1>

                                <i className="fa-solid fa-arrow-right"></i>
                            </h1>

                        </div>
                    </div>

                    <div className='about-sect2-textwith-image'>
                        <h1>TECHNICIANS ,&nbsp; AND DESIGNERS</h1>
                        <img src="src/assets/text-with-img1.jpg" style={{ width: '260px', borderRadius: '50px', margin: '0px 0px 0px 30px' }} alt="" />
                    </div>

                    <div className='about-sect2-textwith-image'>
                        <h1>FOR &nbsp;COMPLETE </h1>
                        <div className='about-topright-icon2'>
                            <h1>
                                <i className="fa-solid fa-wrench"></i>
                            </h1>
                        </div>
                        <h1>NEEDS</h1>
                    </div>

                    <div className='about-sect2-bottom'>
                        <div >
                            <h1>950+</h1>
                            <p>Succeccfull Service</p>

                        </div>

                        <hr />
                        <div>
                            <h1>910+</h1>
                            <p>Satisfied Clients</p>

                        </div>

                        <hr />
                        <div>
                            <h1>400+</h1>
                            <p>Professionals</p>

                        </div>

                        <hr />
                        <div>
                            <h1>220+</h1>
                            <p>Global Stores</p>

                        </div>
                    </div>


                </div>
            </section>

            {/* section three starts */}

            <section>
                <div className='about-sect3-cont'>
                    <div className='about-sect3-top'>
                        <p>OUR PROFESSIONAL</p>
                        <h1>Expert &nbsp;Technical&nbsp; Team</h1>
                    </div>
                    <div className='about-sect3-bottom'>
                        {
                            getTeam?.slice(1, 5).map((teamMember, indx) => {
                                return (
                                    <div key={indx} className='expert-team'>
                                        <img src={teamMember.image} alt="expert team member image" style={{ width: '280px',borderRadius:'20px' }} />
                                        <h1>{teamMember.name}</h1>
                                        <p>{teamMember.job}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section>
        </div >

    )
}

export default AboutUs