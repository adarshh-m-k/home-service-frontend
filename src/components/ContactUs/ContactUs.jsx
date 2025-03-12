import React, { useState } from 'react'
import './ContactUs.css'
import { Apidata } from '../BaseApi';
function ContactUs() {

    let [list, setList] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''

    })

    function contactInput(e) {

        let { name, value } = e.target;
        console.log(e.target);

        setList(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    function submitContact() {

        if (list.name === '' || list.phone === '' || list.email === '' || list.message === '') {
            alert('Please fill all format')
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

        Apidata.post('/contact/contact', list).then((result) => {

            console.log(result);
            alert('Our Subordinates will call you')



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


    }


    return (

        < div className='contactus-main-container' >

            <header>
                <div className='contact-header-cont'>
                    <div className='contact-header-writing' >
                        <h1>Contact</h1>
                        <p>Home / Contact</p>

                    </div>
                </div>
            </header>

            <section>
                <div className='contact-sect2-container'>

                    <div className='cont-sect2-top'>
                        <div className='cont-top-left'>
                            <h5>CONTACT OUR EXPERTS</h5>
                            <h1>Reach Out & Connect</h1>
                        </div>
                        <div className='cont-top-right'>
                            <p>We are here to help you with all your home service needs. Whether it's<br></br>
                                plumbing, cleaning, electrical, or other services, feel free to reach<br></br>
                                out to us with any questions or requests. Our team is ready to provide<br></br> top-quality service and ensure a prompt response to your inquiries.</p>
                        </div>
                    </div>

                    <div className='cont-sect2-bottom'>
                        <div className='cont-bottom-left'>
                            <input
                                className='contact-input'
                                type="text"
                                name='name'
                                value={list.name}
                                placeholder='Your Name*'
                                onChange={contactInput} />

                            <input
                                className='contact-input'
                                type="number"
                                name='phone'
                                value={list.phone}
                                placeholder='Your Phone*'
                                onChange={contactInput} />

                            <input
                                className='contact-input'
                                type="email"
                                name='email'
                                value={list.email}
                                placeholder='Email Id*'
                                onChange={contactInput} />

                            <textarea className='contact-textarea'
                                type="text"
                                name='message'
                                value={list.message}
                                placeholder='Message*'
                                onChange={contactInput} ></textarea>

                            <div className='contact-submitBtn'>
                                <button onClick={submitContact}>Submit your Query</button>
                            </div>

                        </div>

                        <div className='cont-bottom-right'>
                            <h1>Say Hello!</h1>
                            <p>Please fill in your details below so we can<br></br>
                                proceed with your booking and ensure we provide<br></br> the best service tailored to your needs.</p>
                            <img src="src/assets/contact-fm-img.jpg" alt="contact page image" style={{ width: '400px', borderRadius: '30px', marginLeft: '40px' }} />
                            <h2>Enquries</h2>
                            <p>Stay connected with us through social<br></br> media for updates and support.</p>
                            <div className='socialmedia-icon'>
                                <h3><i class="fa-brands fa-instagram"></i></h3>
                                <h3><i class="fa-brands fa-facebook-f"></i></h3>
                                <h3><i class="fa-brands fa-linkedin-in"></i></h3>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <section>
                <div className='contact-sect3-container'>

                    <div className='sect3-cont-top'>
                        <h3>AVAILABLE &nbsp;IN&nbsp; KERALA</h3>
                        <h1>Office &nbsp;Locations</h1>
                        <p>Get reliable and professional home
                            services anywhere in Kerala! From
                            plumbing<br></br> and electrical repairs to
                            deep cleaning and appliance maintenance,
                            our expert team is  just <br></br>a call away.
                            Book now for hassle-free, trusted
                            service across the state!</p>
                    </div>

                    <div className='sect3-cont-bottum'>
                        <div className='sect3-cont-bottum-box'>
                            <h1>Kozhikode</h1>
                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-location-dot"></i></h5></div>
                                <div><p>1st Floor, Al-Falah Complex,
                                    Near Bus Stand, NH 766,
                                    Thamarassery, Kozhikode,
                                    Kerala - 673573</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-phone"></i></h5></div>
                                <div><p>+91 98765 43210</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-envelope"></i></h5></div>
                                <div><p>support@homeservicekerala.com</p></div>
                            </div>
                        </div>

                        <div className='sect3-cont-bottum-box'>
                            <h1>Kochi</h1>
                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-location-dot"></i></h5></div>
                                <div><p> Edappally Branch
                                    1st Floor, ABC Plaza,
                                    Near Lulu Mall, Edappally,
                                    Kochi, Kerala - 682024</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-phone"></i></h5></div>
                                <div><p>+91 70123 45678</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-envelope"></i></h5></div>
                                <div><p>info@homeservicekerala.com</p></div>
                            </div>
                        </div>

                        <div className='sect3-cont-bottum-box'>
                            <h1>Thrissur</h1>
                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-location-dot"></i></h5></div>
                                <div><p>3rd Floor, City Square Building,
                                    Punkunnam Junction,
                                    Thrissur, Kerala - 680002</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-phone"></i></h5></div>
                                <div><p>+91 80835 72000</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-envelope"></i></h5></div>
                                <div><p>contact@homeservicekerala.com</p></div>
                            </div>
                        </div>

                        <div className='sect3-cont-bottum-box'>
                            <h1>Thiruvananthapuram</h1>
                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-location-dot"></i></h5></div>
                                <div><p>2nd Floor, XYZ Tower,
                                    Opp. Pattom Junction,
                                    Thiruvananthapuram, Kerala - 695004</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-phone"></i></h5></div>
                                <div><p>+91 90643 42000</p></div>
                            </div>

                            <div className='sect3-cont-bottum-box-items'>
                                <div><h5><i class="fa-solid fa-envelope"></i></h5></div>
                                <div><p>helpdesk@homeservicekerala.com</p></div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div >
    )
}

export default ContactUs;