import React, { useContext } from 'react'
import { IntrPageVisible } from '../context/MainContex';
import IntrBar from './IntrBar'


const UpSection = () => {
  const {setIntrVisible} = useContext(IntrPageVisible);
  return (
    <div className='up-section'>
      <div className='up-section-content'>
        <div className='top-part'>
          <div className='logo-name'>
            
          </div>
          <div className='intr-btn' onClick={()=>{setIntrVisible(true)}}>
              
          </div>
        </div>
      </div>
      <IntrBar/>
    </div>
  )
}

export default UpSection