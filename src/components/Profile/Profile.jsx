import React, { useEffect, useState } from 'react';
import './Profile.css'
import { updateUser } from '../Redux/Redux';
import { useDispatch, useSelector } from 'react-redux';  
import { Apidata } from '../BaseApi';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    address: '',
    gender: '',
    dob: '',
  });

 
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {


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
              style={{ width: '200px', height: '47px', borderRadius: '8px', paddingLeft: '13px' }}>
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
