import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Apidata } from '../BaseApi';
import './SingleService.css'
import { useSelector } from 'react-redux';


function SingleService() {
    const navigate = useNavigate()

    const service = useSelector((state) => { return state.service.value })

    const user = useSelector((state) => { return state.user })

    // let [userdate, setUserData] = useState('')
    let [getData, setGetData] = useState([])

    console.log("servicedata", service);
    console.log("userdata", user);


    const [state, setState] = useState([])

    const [activeIndex, setActiveIndex] = useState(null); // State to manage the active accordion

    // Toggle the accordion
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Close the accordion if it's already open, else open it
    };


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

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        address: '',
        details: ''

    })

    const [booking, setBooking] = useState({
        name: user?.username,
        phone: user?.mobile,
        email: user?.email,
        date: '',
        time: '',
        address: user?.address,
        details: '',
        serviceId: service?._id,
        userId: user?._id

    })
    console.log(booking);


    useEffect(() => {
        Apidata.get(`/service/single-service/${service?._id}`)
            .then((result) => {
                console.log(result);

                setState(result.data.data)

            })
            .catch((err) => {
                console.log(err);

            })


    }, [])


    // useEffect(() => {
    //     if (user?._id) {
    //         Apidata.get('/user/user-data', {
    //             params: {
    //                 id: user._id
    //             }
    //         }).then((result) => {
    //             setUserData(result.data.data);
    //         })
    //             .catch((error) => {
    //                 console.error("Error fetching user data:", error);
    //             });
    //     }
    // }, [user]);

    function bookingDetail(e) {
        let { name, value } = e.target

        setBooking(prevBooking => ({
            ...prevBooking,
            [name]: value

        }))
    }


    const validateForm = () => {
        const newErrors = {};

        // name validation
        if (!booking.name) newErrors.name = 'Name is required';

        // phone number validation 
        if (!booking.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(booking.phone)) {
            newErrors.phone = 'Phone must be 10 digits';
        }

        // email id validation
        if (!booking.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(booking.email)) {
            newErrors.email = 'Email is invalid';
        }

        // time validating

        if (!booking.time) newErrors.time = 'Preferred time is required';

        // date validating
        if (!booking.date) newErrors.date = 'Preferred date is required';

        // hours validating
        if (!booking.address) newErrors.address = 'Address is required';

        // Details validating
        if (!booking.details) newErrors.details = 'Job details are required';

        setErrors(newErrors);

        // if there are errors
        return Object.keys(newErrors).length === 0;
    };

    const goToCart = () => {

        // validate the inputs
        if (validateForm()) {

            console.log("b",booking);
            
            // if validation is ok, start API call
            Apidata.post('/booking/book-service', booking)
                .then((result) => {

                    console.log(result);
                    navigate('/paymentconfirm', booking);
                })
                .catch((error) => {

                    console.error('Error occurred while booking:', error);

                    alert('An error occurred while processing your booking. Please try again.');
                });
        } else {

            alert('Please fill in all required fields correctly.');
        }
    };


    return (
        <div>



            <header>
                <div className='singleservice-header-cont'>
                    <div className='singleservice-header-writing' >
                        <h1>{state.job}</h1>
                        <p>Home / Service / {state.job} </p>

                    </div>
                </div>
            </header>

            {/* first section of single service */}

            <section>
                <div className='sect1-single-container'>
                    <div className='sect1-single-left'>
                        <div className='sect1-left-img1'>

                            {state?.images?.length > 1 ? (

                                <img src={state.images[3]} alt="Service Image" style={{ width: "97%", height: "500px", borderRadius: "20px" }} />

                            ) : (
                                <p>Image not available</p>

                            )}
                        </div>
                        <div className='sect1-left-first'>
                            {
                                <h1>{state.jobHeading}</h1>
                            }
                        </div>
                        <div className='sect1-left-second'>
                            {
                                <p>{state.paragraph4}</p>
                            }
                        </div>
                        <div className='sect1-left-third' >
                            <div className='sect1-left-icon'>
                                <h1>

                                    <i class="fa-solid fa-quote-right"></i>
                                </h1>
                            </div>
                            <div className='sect1-left-paragraph2'>
                                <p>{state.paragraph3}</p>

                            </div>

                        </div>

                        <div className='sect1-left-fourth'>
                            <p>{state.paragraph2}</p>

                        </div>

                        <div className='sect1-left-fifth'>

                            {state?.images?.length > 1 ? (

                                <img src={state.images[2]} alt="Service Image" style={{ width: "460px", height: "270px", borderRadius: "20px" }} />

                            ) : (
                                <p>Image not available</p>

                            )}



                            {state?.images?.length > 1 ? (

                                <img src={state.images[1]} alt="Service Image" style={{ width: "460px", height: "270px", borderRadius: "20px" }} />

                            ) : (
                                <p>Image not available</p>

                            )}

                        </div>

                        <div className='sect1-left-sixth'>
                            <p>{state.paragraph1}</p>

                        </div>

                        <div className='sect1-left-faq'>
                            <p>
                                We understand that you may have questions about
                                our home services, from booking to service quality
                                and pricing. To make things easier, we've gathered
                                the most common inquiries and answered them for you.
                                Browse our FAQ section to find all the details you
                                need for a smooth and hassle-free experience.
                            </p>

                            <div className='service-faq-cont'>

                                {serviceFAQs.map((item, index) => (
                                    <div className='service-faq' key={index}>
                                        <div
                                            className='service-faq-header'
                                            onClick={() => toggleAccordion(index)} // Toggle on click
                                        >
                                            <h2>{item.question}</h2>
                                            <span>{activeIndex === index ? '-' : '+'}</span> {/* Toggle icon */}
                                        </div>
                                        <div className={`service-faq-content ${activeIndex === index ? 'show' : ''}`}>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                    <div className='sect1-single-right'>


                        <div className='sect1-right-first'>
                            <h2 >Book Your Service... <br></br> Now!</h2>
                            <img src="src/assets/testimonial-type2.png" alt="" />
                        </div>
                        <div className='sect1-right-second-and-third'>

                            <div className='sect1-right-second'>
                                <div className='sect1-right-second-heading'>
                                    <h1> Working Hours:</h1>
                                </div>
                                <div className='sect1-right-second-body'>
                                    <h3>Monday - Wednesday:</h3>
                                    <p>08:30AM to 09:30PM</p>

                                    <h3>Thursday - Friday:</h3>
                                    <p>10:00AM to 08:30PM</p>

                                    <h3>Monday - Wednesday:</h3>
                                    <p>08:00AM to 01:00PM</p>
                                </div>
                            </div>
                            <div className='sect1-right-third'>
                                <div className='sect1-right-third-heading'>
                                    <h1>Get In Touch:</h1>

                                </div>
                                <div className='sect1-right-third-body'>
                                    <div className='sect1-right-third-body-contacts'>

                                        <div>
                                            <h2><i class="fa-solid fa-phone"></i> </h2>
                                        </div>
                                        <div>

                                            <p>+91 9064342000</p>
                                            <p>+91 8083572000</p>
                                        </div>
                                    </div>
                                    <div className='sect1-right-third-body-contacts'>
                                        <div>

                                            <h2> <i class="fa-solid fa-envelope"></i> </h2>
                                        </div>
                                        <div>

                                            <p>homeservice@gmail.com</p>
                                            <p>contactus@gmail.com</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <section>
                <div className='singleservice-booking-cont'>
                    <div className='singleservice-booking-left'>
                        <div className='singleservice-booking-top'>
                            <p>FOR BOOKING</p>
                            <h1>
                                Enter your booking details

                            </h1>
                        </div>
                        <div className='singleservice-booking-bottom'>
                            <div className='singleservice-booking-inputs'>

                                <div className='singleservice-booking-inputs-left'>
                                    <p>Contact Details</p>

                                    <input
                                        type="text"
                                        name='name'
                                        value={booking.name}
                                        placeholder='Name'
                                        onChange={bookingDetail} />
                                    {errors.name && <span className="error">{errors.name}</span>}

                                    <input
                                        type="number"
                                        name='phone'
                                        value={booking.phone}
                                        placeholder='Phone'
                                        onChange={bookingDetail}
                                    />
                                    {errors.phone && <span className="error">{errors.phone}</span>}

                                    <input
                                        type="email"
                                        name='email'
                                        value={booking.email}
                                        placeholder='Email Id'
                                        onChange={bookingDetail}
                                    />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                                <div className='singleservice-booking-inputs-right'>
                                    <p>When would you prefer the Pro to visit?</p>
                                    <input
                                        type="time"
                                        name='time'
                                        value={booking.time}
                                        onChange={bookingDetail}
                                    />
                                    {errors.time && <span className="error">{errors.time}</span>}
                                    <input
                                        type="date"
                                        name='date'
                                        value={booking.date}
                                        onChange={bookingDetail}
                                    />
                                    {errors.date && <span className="error">{errors.date}</span>}
                                    <input type="text"
                                        name="address"
                                        placeholder='Your Address'
                                        value={booking.address}
                                        onChange={bookingDetail}
                                    />

                                    {errors.address && <span className="error">{errors.address}</span>}
                                </div>
                            </div>
                            <div className='singleservice-booking-textarea'>

                                <textarea
                                    name="details"
                                    value={booking.details}
                                    onChange={bookingDetail}
                                    placeholder='Please describe the job detail..(Required)'>
                                </textarea>

                            </div>
                            {errors.details && <span className="error">{errors.details}</span>}

                            <div className='singleservice-bookingtn'>
                                <button onClick={goToCart}>Confirm Service</button>
                            </div>


                        </div>

                    </div>
                    <div className='singleservice-booking-right'>


                    </div>




                </div>
            </section>



        </div>
    )
}

const serviceFAQs = [
    {
        question: "What does the initial service visit include?",
        answer: "Our initial visit is focused on assessing the problem and discussing possible solutions with you. We will examine the issue, explain the necessary steps for fixing it, and provide details on potential improvements. If any repairs or services are required, we will also discuss pricing before proceeding with any work."
    },
    {
        question: "Is the price listed on the website the final cost?",
        answer: "The price displayed on the website covers only the initial inspection and minor fixes. If the job requires extensive work, additional charges may apply. Our team will inform you of any extra costs before starting major repairs, ensuring full transparency."
    },
    {
        question: "How do I book a service?",
        answer: "You can easily book a service through our website by selecting the required service, choosing a preferred date and time, and submitting your contact details. After confirmation, you'll receive a booking notification with all the necessary information."
    },
    {
        question: "Are your service providers experienced and verified?",
        answer: "Yes! All our professionals are experienced, skilled, and background-checked to ensure safety and quality service. We only work with qualified experts to provide reliable and professional solutions."
    },
    {
        question: "What payment options are available?",
        answer: "We offer multiple payment options, including online payments through credit/debit cards, digital wallets, and cash payments after the service is completed. Payment details will be shared with you at the time of booking."
    }
];



export default SingleService