import React, { useContext } from 'react'
import { IntrPageVisible } from '../context/MainContex';
import IntrBar from './IntrBar'
import menuIcon from '../static/icons/menu.svg'
import logo from '../static/icons/logo.svg'

import { motion } from 'framer-motion';
const UpSection = () => {
  const {setIntrVisible} = useContext(IntrPageVisible);
  return (
    <div className='up-section'>
      <div className='up-section-content'>
        <div className='top-part'>
          <div className='logo unselectable'>
                <img src={logo} alt="" />
          </div>
          <motion.div whileTap={{scale:0.9}} className='intr-btn unselectable' onClick={()=>{setIntrVisible(true)}}>
              <img src={menuIcon} alt="" />
          </motion.div>
        </div>
      </div>
      <IntrBar/>
    </div>
  )
}

export default UpSection