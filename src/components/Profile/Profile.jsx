// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'

// function Profile() {

//   useEffect(() => {
//     (async () => {
//       try {
//         let result = await Apidata.get(`/user/profile/${id}`)
//         console.log(result.data);
//         setGetData(result.data.data)

//       } catch (error) {

//       }
//     })()
//   }, [])
//   return (
//     <div>{ }</div>
//   )
// }

// export default Profile



import React, { useEffect, useState } from 'react';
import './Profile.css'
import { updateUser } from '../Redux/Redux';
import { useDispatch, useSelector } from 'react-redux';  // Access Redux state
import { Apidata } from '../BaseApi';

function Profile() {
  // Get the user details from Redux state
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Adjust based on how you're storing user data

  // Fallback if user data is not available
  // const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    gender: '',
    dob: '',
  });

  // State to toggle edit mode
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // If user data is already in Redux, use it
    // if (user) {
    //   // setUserData(user);
    //   // console.log("User from Redux:", user);


    // } else {
    //   // Optionally, you can make an API call here to fetch user details if not available in Redux
    //   console.log('User data not found');
    // }

    console.log("User state updated:", user);


    if (user) {
      setFormData({
        _id: user._id,
        address: user.address || '',
        gender: user.gender || '',
        dob: user.dob || '',
        username: user.username || '',
        mobile: user.mobile || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // if (!user || Object.keys(user).length === 0) {
  //   return <div>Loading...</div>; // Show loading while waiting for user data
  // }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSave = async () => {

    console.log("Updating User Data:", formData);

    try {

      const response = await Apidata.put('/user/update-user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });




      const updatedUser = response.data;

      dispatch(updateUser(updatedUser)); // Only updates changed fields
      // console.log("Updated Redux State:", store.getState().user)
      alert('Profile updated successfully!');


      setIsEditable(false);

    } catch (error) {

    }

  };


  const handleEdit = () => {
    setIsEditable(true); // Enable inputs when clicking Edit
  };


  if (!user || Object.keys(user).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className='profile-section-cont'>
      {/* <div className='profile-cont-top' >
        <h1>Personal Information</h1>

      </div> */}
      <div className='profile-cont'>
        <div className='profile-left'>
          <h1>Personal Information</h1>


          <div>
            <label htmlFor="">Username</label>
            <input type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={user.username}
              disabled={!isEditable} />
          </div>

          <div>
            <label htmlFor="">Phone</label>
            <input type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder={user.mobile}
              disabled={!isEditable} />
          </div>

          <div>
            <label htmlFor="">Email</label>
            <input type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={user.email}
              disabled={!isEditable} />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='******'
              disabled={!isEditable} />
          </div>

        </div>
        <div className='profile-right'>
          <div>

            <label htmlFor="">Address</label>
            <input type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div>

            <label htmlFor="">Gender</label>
            <select name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditable}
              style={{ width: '400px', height: '47px', borderRadius: '8px', paddingLeft: '13px' }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Date of Birth</label>
            <input type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={!isEditable} />
          </div>
          <div className='button-group'>
            {isEditable ? (
              <button onClick={handleSave}>Save Changes</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
