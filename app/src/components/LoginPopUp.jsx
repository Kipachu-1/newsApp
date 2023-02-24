import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { isSignedIn, LoginVisible } from '../context/MainContex';
import { APIservice } from '../API/APIservice';
import { DataManager } from '../utilities/DataManager';
import jwt_decode from 'jwt-decode'
const LoginPopUp = () => {
    const {setLogVisible} = useContext(LoginVisible)
    const {setIsSignedInS} = useContext(isSignedIn)
  return (
    <div className='login-pop-up-back' onClick={()=>{setLogVisible(false)}} >
        <div className='login-pop-up' onClick={(e)=>{e.stopPropagation()}}>
            <div className='login-eu-input login-container-input' >
                <input type="text" className='login-input' placeholder='Username or Email'/>
            </div>
            <div className='login-ps-input login-container-input'>
                <input type="text" className='login-input' placeholder='Password'/>
            </div> 
            <div className='login-btn'>
                Sign-in
            </div>
            <div style={{textAlign:'center'}}>
                or
            </div>
            <GoogleLogin auto_select onSuccess={(credentials)=>{
                setLogVisible(false)
                setIsSignedInS(true)
                DataManager.setUserTraits(jwt_decode(credentials.credential))
                APIservice.login(credentials).then((userData)=>
                {   
                    DataManager.setUserData(userData.data);
                })
            }}/>
        </div>
    </div>
    
  )
}

export default LoginPopUp