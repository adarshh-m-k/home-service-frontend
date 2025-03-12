import React, { useEffect, useState } from 'react'
import { Apidata } from '../BaseApi'
import { useSelector } from 'react-redux'
import './PaymentConfirm.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function PaymentConfirm() {

    const [orderId, setOrderId] = useState(null);
    // const amount =;
    const currency = "INR";
    const receiptId = "receipt#1";

    const location = useLocation()

    let [confirm, setConfirm] = useState([])
    let user = useSelector((state) => state.user)
    let navigate = useNavigate()

    const booking = location.state?.booking

    console.log("++====>>>><<<", booking);

    useEffect(() => {
        Apidata.get('/booking/booking-data', {
            params: {
                userId: user?._id
                //userId: user?._id 
            }
        }).then((result) => {
            setConfirm(result.data.data)
            console.log(result.data.data);


        }).catch((err) => {
            console.log(err);


        })
    }, [])


    // console.log("============>>>>>>", user);

    const paymentBtn = async (e, serviceAmount) => {
        const amountInPaise = serviceAmount * 100;
        try {
            // Step 1: Create order on your backend
            const response = await axios.post('http://localhost:3000/payment/order', {
                amount: amountInPaise,
                currency,
                receipt: receiptId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { order_id } = response.data; // Get order_id from backend response
            setOrderId(order_id);

            console.log('Order ID from backend:', order_id);
            console.log(response.data);


            // Step 2: Set up Razorpay payment options
            const options = {
                key: "rzp_test_ihLrgXlzIj4trH", // Razorpay test key
                amount: amountInPaise,
                currency,
                name: "Home service",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id, // Pass the order_id created in the backend
                handler: async function (paymentResponse) {
                    try {

                        const res = await axios.post('http://localhost:3000/payment/success', {

                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_signature: paymentResponse.razorpay_signature
                        })

                        await axios.put('http://localhost:3000/booking/update-payment', {
                            bookingId: booking.serviceId,   // Send booking ID
                            orderId: paymentResponse.razorpay_order_id,
                            paymentStatus: "success"
                        });



                        if (res.data.message === 'Payment successful and order updated!') {
                            alert('Payment was successful! Your order is now confirmed.');


                        }
                    } catch (error) {
                        console.error('Error sending payment details:', error);
                    }



                    // Log the entire response to debug
                    console.log("Full Payment Response:", paymentResponse);

                    // Check if response contains expected fields and alert them

                    alert(`Payment ID: ${paymentResponse.razorpay_payment_id}`);
                    alert(`Order ID: ${paymentResponse.razorpay_order_id}`);
                    alert(`Signature: ${paymentResponse.razorpay_signature}`);

                    // alert("Your Payment is Successfull")


                    // localStorage.setItem("paymentStatus", JSON.stringify({
                    //     status: "success",
                    //     orderId: paymentResponse.razorpay_order_id
                    // }));


                    // Navigate to "My Bookings" page
                    setTimeout(() => {
                        navigate('/mybooking');
                    }, 500);

                },
                prefill: {
                    name: "Adarsh",
                    email: "code98806@gmail.com",
                    contact: "9000090000" // Customer phone number
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);

            // Handle payment failure
            rzp1.on('payment.failed', function (response) {
                console.log('Payment failed:', response.error);
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });

            rzp1.open();
            e.preventDefault();
        } catch (error) {
            console.error('Error making payment request:', error);
        }

    };

    return (
        <div className='confirm-payment-cont'>
            <div className='confirm-payment-sect1'>
                {
                    confirm?.length > 0 && (
                        <div className='confirm-payment-maping'>
                            {/* Accessing the last item in the confirm array */}

                            {confirm[confirm.length - 1]?.serviceDetails?.map((service, idx) => (
                                <div key={idx} className='confirm-service-details'>

                                    <div className="confirm-service-image">
                                        {service?.images?.length > 1 ? (
                                            <img
                                                src={service.images[0]} // Accessing image for each service
                                                alt={`image of ${service.job}`} // Image for the specific job
                                                style={{ width: '370px', height: '250px', borderRadius: '30px' }}
                                            />) : (
                                            <p>image not available</p>

                                        )}
                                    </div>

                                    <div className='confirm-service-body'>
                                        <h1>{service.job}</h1>
                                        <p>{service.discription}</p>
                                        <p><strong>Time:</strong> {confirm[confirm.length - 1]?.time}</p>
                                        <p><strong>Date:</strong> {confirm[confirm.length - 1]?.date}</p>
                                        <p><strong>Address:</strong> {confirm[confirm.length - 1]?.address}</p>
                                    </div>

                                    <div>
                                        <button onClick={(e) => { paymentBtn(e, service.amount) }} style={{ width: '370px', marginTop: '10px' }}>{service.amount}&#8377;</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default PaymentConfirm