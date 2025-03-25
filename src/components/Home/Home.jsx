import { useEffect, useState } from 'react'
import './Home.css'
import { Apidata } from '../BaseApi'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { setServiceJob } from '../Redux/Redux';


function Home() {


  let dispatch = useDispatch()
  let [service, setService] = useState([])
  let navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  useEffect(() => {
    (async () => {
      try {
        let response = await Apidata.get('/service/get-data')
        console.log(response.data.data);
        setService(response.data.data)

      } catch (error) {

      }
    })()
  }, [])

  function goToService(obj) {

    dispatch(setServiceJob(obj))
    navigate(`/singleservice`)

  }

  function servicePage() {
    navigate('/services')
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,

  };
  return (
    <div>
      <header className='header-container'>

        <div className='header-body-container'>
          <div className='header-body'>
            <h3>LET'S GET TO WORK</h3>
            <h1>Honest,Trustworthy,And<br>
            </br> Does Good Work</h1>
            <p>No matter what service you need, our team is just a call<br>
            </br> away to provide you with the highest quality assistance.</p>
            <img src="src/assets/Rating-image.png" alt="rating image" width={"120px"} />
            <div className='rating'>
              4.1k Reviews
            </div>
          </div>
        </div>

      </header>

      {/* header is over */}

      {/* section 2 starts */}

      <section>
        <div className='sect2-container'>
          <div className='sect2-left'>

            <div className='sect2-left-top'>
              <p>24/7 HASSLE FREE</p>
              <h1>Home And Businesses <br>
              </br> Installation Services</h1>
            </div>

            <div className='sect2-left-bottom'>
              <div className='sect2-oneimg'>
                <div className='sect2-img1'>
                  <img src="src/assets/h1-about-img-01.jpg" alt="" style={{ borderRadius: "20px" }} width={"330px"} height={"460px"} />
                </div>
              </div>
              <div className='sect2-twoimg'>
                <div className='sect2-img2'>
                  <img src="src/assets/h1-about-img-02.jpg" alt="" style={{ borderRadius: "20px" }} width={"270px"} />
                </div>

                <div className='sect2-img3'>
                  <img src="src/assets/h1-about-img-03.jpg" alt="" style={{ borderRadius: "20px" }} width={"300px"} />
                </div>
              </div>
            </div>

            <div className='sect2-left-writing'>
              <h1>560+</h1>
              <p>Projects Done</p><hr style={{ borderColor: 'black' }} />
              <h1>100+</h1>
              <p>Technicians</p>
            </div>
          </div>

          <div className='sect2-right'>
            <div className='sect2-right-top'>
              <p>We understand that your time is valuable,
                which is why we offer flexible<br></br> scheduling
                to fit your busy life. Our services are not
                only efficient but<br></br> also cost-effective,
                ensuring you get the best value for your money.<br></br>
                Let us handle the hard work so you can enjoy a
                stress-free home environment.</p>
            </div>

            <div className='sect2-right-bottom'>

              <div className='sect2-right-bottom-writing'>
                <h1>Earliest Consultation</h1>
                <p>We understand the urgency of your needs and offer quick
                  consultations<br></br> to ensure that you get the help you need
                  at the earliest. Our team<br></br> is here to guide you every
                  step of the way.</p>
              </div>

              <div className='sect2-right-bottom-writing'>
                <h1>Customized Solution</h1>
                <p>Our solutions are tailored to your specific requirements,
                  ensuring that<br></br> you receive the most effective and
                  personalized approach to your needs.<br></br> We don’t offer
                  one-size-fits-all solutions; we create the
                  perfect fit for you.</p>
              </div>

              <div className='sect2-right-bottom-writing'>
                <h1>All-In-One Service</h1>
                <p>We believe that quality services should be
                  accessible to everyone.<br></br> That's why we offer
                  competitive and affordable pricing without<br></br>
                  compromising on the excellence of our work.</p>
              </div>

              <div className='sect2-right-bottom-writing'>
                <h1>All-In-One Service</h1>
                <p>From start to finish, we provide a complete
                  range of services to handle<br></br> all your needs
                  under one roof. No need to juggle multiple
                  providers – <br></br>we’ve got everything covered for you.</p>
              </div>

            </div>

            <div className='sect2-for-booking'>
              <h2>18008899999</h2>
              <p>Call for booking</p>
            </div>

          </div>
        </div>

      </section>

      {/* section 3 starts */}


      <section>
        <div className='sect3-cont'>

          <div className='sect3-top'>

            <div className='sect3-top-left'>
              <p>OUR  SERVICES</p>
              <h1>Ideal Solution For Time<br></br>
                Consuming Problems</h1>
            </div>

            <div className='sect3-top-right'>
              <p>Our services offer professional solutions
                to meet your home and office needs,<br></br>
                including electrical, plumbing, carpentry,
                and more. We provide skilled technicians
                <br></br> to ensure quality, reliability,
                and customer satisfaction for all types
                of maintenance<br></br> and installation
                tasks.</p>
            </div>

          </div>

          <div className='sect3-bottom'>

            <Slider {...settings}>
              {
                service.slice(1, 6).map((obj, index) => {
                  return (
                    <div key={index} className='sect3-maping-service'>
                      <img src={obj.images[0]} alt="" style={{ height: '320px', width: '370px', borderRadius: '30px' }} />
                      <h1 onClick={() => { goToService(obj) }}>{obj.job}</h1>
                      <p>{obj.discription}</p>
                    </div>
                  )
                })
              }
            </Slider>

          </div>

          <div className='sect3-view-all'>
            <button onClick={servicePage}>View all Services</button>
          </div>

        </div>
      </section>

      <hr style={{ margin: '0px 80px 0px 80px', marginBottom: '120px' }} />


      {/* section 4 starts */}

      <section>
        <div className='sect4-container'>

          <div className='sect4-first-child'>
            <p>Prople trust</p>
            <h1>Why we<br></br> Are best</h1>
            <p>Live life to the fullest and<br></br> embrace the challenges<br></br> with confidence.</p>
          </div>

          <div className='sect4-other-child'>
            <h2>Licence Technicians</h2>
            <p>It was indeed at the front of the hall, where<br></br> the valley meets the junction.</p>
          </div>

          <div className='sect4-other-child'>
            <h2>Top Rated Service</h2>
            <p>The criminal's wickedness was crushed by the fermentation or placement of the edges.</p>
          </div>

          <div className='sect4-other-child'>
            <h2>Timely Service</h2>
            <p>Mauris rises strong and stable,<br></br> in fermentation and care.</p>
          </div>

        </div>
      </section>


      {/* section 5 starts */}

      <section>
        <div className='sect5-container'>
          <div className='sect5-top'>
            <div className='sect5-writing'>

              <div className='sect5-writing-left'>
                <h3>FRIENDLY &nbsp;SERVICES</h3>
                <h1>Safe And Secure Plumbing,<br></br>
                  Electrical And Carpenter<br></br>
                  Work</h1>

              </div>

              <div className='sect5-writing-right'>
                <p>Our customers consistently give us 5-star
                  ratings for our<br></br> quality and reliability.
                  We take pride in offering prompt<br></br> and professional
                  service, ensuring complete satisfaction.<br></br> Trust us
                  for all your home service needs<br></br> and experience the difference.</p>
                <img src="src/assets/Rating-image.png" width={"120px"} alt="rating image" />
                <p>4.1 Reviews</p>
              </div>

            </div>

            <div className='sect5-numbers'>

              <div className='sect5-bottum'>
                <h1>950+</h1>
                <p>Successful Services</p>
              </div>

              <div className='sect5-bottum' >
                <h1>910+</h1>
                <p>Satisfied Clients</p>
              </div>

              <div className='sect5-bottum'>
                <h1>400+</h1>
                <p>Professionals</p>
              </div>

              <div className='sect5-bottum'>
                <h1>220+</h1>
                <p>Global Stores</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* section 6 starts */}


      <section>
        <div className='sect6-container'>

          <div className='sect6-left'>
            {/* left image div */}
          </div>

          <div className='sect6-right'>
            <p>REPAIR & INSTALLATION</p>
            <h1>Frequently Asked Question</h1>
            <div className='sect6-questions-cont' >
              <div className='sect6-questions'>
                {faq.map((item, index) => (
                  <div className='accordion-item' key={index}>
                    <div
                      className='accordion-header'
                      onClick={() => toggleAccordion(index)} 
                    >
                      <h2>{item.question}</h2>
                      <span>{activeIndex === index ? '-' : '+'}</span>
                    </div>
                    <div className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

const faq = [
  {
    question: 'What services do you offer?',
    answer: 'We offer a wide range of home and business services including plumbing, electrical, carpentry, HVAC, appliance repairs, and more. Our team of skilled technicians ensures high-quality work tailored to your needs.'
  },

  {
    question: 'How can I book a service?',
    answer: 'Booking a service is easy! You can either call our hotline at 18008899999 or visit our website to schedule an appointment. We offer flexible scheduling to fit your needs.'
  },

  {
    question: 'Are your technicians licensed and insured?',
    answer: 'Yes, all of our technicians are fully licensed and insured to provide you with peace of mind. They are highly trained professionals who meet industry standards.'
  },

  {
    question: 'Do you offer emergency services?',
    answer: 'We provide home services in several areas. Please visit our service areas page on the website to check if we operate in your location or give us a call for more information.'
  },

  {
    question: 'What areas do you serve?',
    answer: 'We provide home services in several areas. Please visit our service areas page on the website to check if we operate in your location or give us a call for more information.'
  },


]

export default Home