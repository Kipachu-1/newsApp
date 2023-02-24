import React from 'react'
import profileIcon from '../static/icons/profile.svg'
const Profile = () => {
  
  return (
    <div className='profile-icon' >
        <img src={localStorage.getItem('__user_traits')?JSON.parse(localStorage.getItem('__user_traits')).picture:''}
        style={{borderRadius:'50%'}} alt="" />
    </div>
  )
}

export default Profile