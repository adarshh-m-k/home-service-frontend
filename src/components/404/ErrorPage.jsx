import React from 'react'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  let navigate = useNavigate()


  return (
    <div className='error-page-cont'>
      <img src="src/assets/404.png" alt="" style={{ width: '650px' }} />
      <h1>Oops ! The Page Not Found.</h1>
      <p>We apologize for the inconvenience. You can use our search bar to find<br></br> what you're
        looking for, or contact us for further assistance.</p>
      <button onClick={()=>{navigate('/home')}}>Back to Home</button>
    </div>
  )
}

export default ErrorPage