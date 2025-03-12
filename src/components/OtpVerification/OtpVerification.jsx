import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Apidata } from '../BaseApi'
import './OtpVerification.css'

function OtpVerification() {

    const navigate = useNavigate()

    const [otp, setOtp] = useState('')
    

    function otpVerify(e) {
        setOtp(e.target.value);

    }

    function verifyBtn() {

        if (!otp) {
            alert('Please enter the OTP')
        }


        Apidata.post('/user/verify-otp', { otp }).then((result) => {
            console.log(result);

            navigate('/')


        }).catch((err) => {
            console.log(err);
        })


    }
    return (
        <div className='otp-main-container'>
            <div className='otp-container'>
                <div className='verify-email'>
                    <h3>OTP Verification</h3>
                    <input type="text"
                        name='otp'
                        value={otp}
                        placeholder='Enter the OTP'
                        onChange={otpVerify}

                    />
                </div>
                <div>
                    <button onClick={verifyBtn}>Verify</button>
                </div>

            </div>
        </div>
    )
}

export default OtpVerification