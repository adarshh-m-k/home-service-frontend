import React, { useEffect, useState } from 'react'
import { Apidata } from '../BaseApi';
import { useSelector } from 'react-redux';
import './MyBooking.css'

function MyBooking() {

  let [bookings, setBookings] = useState([]);
  // const [paymentStatus, setPaymentStatus] = useState(null);
  let user = useSelector((state) => state.user)

  useEffect(() => {
    Apidata.get('/booking/booking-data', {
      params: {
        userId: user?._id
      }
    })
      .then((result) => {
        console.log(result.data);
        setBookings(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // const paymentData = localStorage.getItem("paymentStatus");
    // console.log("payment detail", paymentData);
    // if (paymentData) {
    //   setPaymentStatus(JSON.parse(paymentData));

    // }

  }, []);

  return (
    <div className='mybooking-cont'>


      <header>
        <div className='mybookings-header-cont'>
          <div className='mybookings-header-writing' >
            <h1>My Bookings</h1>
            <p>Home / My Bookings</p>
          </div>
        </div>
      </header>

      <div className='mybooking-sect1'>


        {

          bookings?.map((bookObj, index) => {
            return (

              <div key={index} className='mybooking-section'>

                {bookObj?.serviceDetails?.map((service, idx) => (
                  <div key={idx} className='service-details'>
                    <div className="service-image">
                      {service?.images?.length > 1 ? (
                        <img
                          src={service.images[0]}
                          alt={`image of ${service.job}`}
                          style={{ width: '520px', height: '400px', borderRadius: '30px' }}
                        />
                      ) : (
                        <p>image not available</p>
                      )}
                    </div>
                    <div className='service-right'>
                      <h1>{service.job}</h1>
                      <p>{service.discription}</p>
                      <p>Amount: {service.amount}&#8377;</p>
                      <p><strong>Time:</strong> {bookObj?.time}</p>
                      <p><strong>Date:</strong> {bookObj?.date}</p>
                      <p><strong>Address:</strong> {bookObj?.address}</p>
                       {bookObj.paymentStatus === "success" ? (
                    <p className="payment-success">✅ Payment Successful</p>
                ) : (
                    <p className="payment-pending">⏳ Payment Pending</p>
                )}
                      {/* <p><strong>Status:</strong> {service.paymentStatus === 'paid' ? 'Payment Successful' : 'Payment Pending'}</p> */}
                    </div>
                  </div>
                ))}

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyBooking