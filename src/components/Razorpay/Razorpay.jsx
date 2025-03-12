// import React, { useState } from 'react'
// // import { Apidata } from '../BaseApi'
// import axios from 'axios';

// function Razorpay() {

//     const [orderId, setOrderId] = useState(null);

//     let amount = 50000;
//     let currency = "INR";
//     let receiptId = "receipt#1"

//     const handlePayment = async (e) => {

//         // let payments = await Apidata.post('/payment/order')
//         try {
//             const response = await axios.post('http://localhost:3000/payment/order', {
//                 amount,
//                 currency,
//                 receipt: receiptId
//             }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             const { order_id } = response.data;  // Assuming the response contains order_id

//             setOrderId(order_id);

//             console.log(response);
//             var options = {
//                 "key": "rzp_test_ihLrgXlzIj4trH", // Enter the Key ID generated from the Dashboard
//                 amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//                 currency,
//                 "name": "Home service", //your business name
//                 "description": "Test Transaction",
//                 "image": "https://example.com/your_logo",
//                 "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//                 "handler": function (response) {
//                     alert(response.razorpay_payment_id);
//                     alert(response.razorpay_order_id);
//                     alert(response.razorpay_signature)
//                 },
//                 "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
//                     "name": "adarsh", //your customer's name
//                     "email": "code98806@gmail.com",
//                     "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
//                 },
//                 "notes": {
//                     "address": "Razorpay Corporate Office"
//                 },
//                 "theme": {
//                     "color": "#3399cc"
//                 }
//             };
//             var rzp1 = new window.Razorpay(options);
//             rzp1.on('payment.failed', function (response) {
//                 alert(response.error.code);
//                 alert(response.error.description);
//                 alert(response.error.source);
//                 alert(response.error.step);
//                 alert(response.error.reason);
//                 alert(response.error.metadata.order_id);
//                 alert(response.error.metadata.payment_id);
//             });
//             rzp1.open();
//             e.preventDefault();
//             // Handle the response from the backend
//         } catch (error) {
//             console.error('Error making payment request:', error);
//         }




//     }
//     return (
//         <div>
//             <h1>Biriyani</h1>
//             <p>foooood</p>
//             <button onClick={handlePayment}>Pay</button>
//         </div>
//     )
// }

// export default Razorpay

import React, { useState } from 'react';
import axios from 'axios';

function Razorpay() {
    const [orderId, setOrderId] = useState(null);

    const amount = 50000;
    const currency = "INR";
    const receiptId = "receipt#1";

    const handlePayment = async (e) => {
        try {
            // Step 1: Create order on your backend
            const response = await axios.post('http://localhost:3000/payment/order', {
                amount,
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
                amount,
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
        <div>
            <h1>Biriyani</h1>
            <p>Delicious food!</p>
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
}

export default Razorpay;
