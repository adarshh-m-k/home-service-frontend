import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import OtpVerification from './components/OtpVerification/OtpVerification'
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import ContactUs from './components/ContactUs/ContactUs'
import Header from './components/Header/Header'
import AboutUs from './components/AboutUs/AboutUs'
import Service from './components/Services/Service'
import SingleService from './components/SingleService/SingleService'
import MyBooking from './components/MyBookings/MyBooking'
import ErrorPage from './components/404/ErrorPage'
import { store } from './components/Redux/Redux'
import { Provider } from 'react-redux'
import Razorpay from './components/Razorpay/Razorpay'
import Profile from './components/Profile/Profile'
import PaymentConfirm from './components/PaymentConfirm/PaymentConfirm'
// import Payment from './components/Payment/Payment'

function App() {


  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <HeaderWithConditionalRender />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/otp' element={<OtpVerification />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/header' element={<Header />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/services' element={<Service />} />
            <Route path='/singleservice' element={<SingleService />} />
            <Route path='/mybooking' element={<MyBooking />} />
            <Route path='/*' element={<ErrorPage />} />
            <Route path='/razor' element={<Razorpay />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/paymentconfirm' element={<PaymentConfirm />} />

            {/* <Route path='/payment' element={<Payment />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  )
}
function HeaderWithConditionalRender() {

  const location = useLocation();


  const hideHeaderPaths = ['/signup', '/', '/*', '/otp'];


  if (hideHeaderPaths.includes(location.pathname)) {
    return null; // Don't render Header
  }

  return <Header />; // Render Header for other routes
}
export default App