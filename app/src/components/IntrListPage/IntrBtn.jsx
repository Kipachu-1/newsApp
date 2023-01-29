import React from 'react'
import { motion } from 'framer-motion'
const IntrBtn = ({...props}) => {
  return (
    <motion.div whileTap={{scale:0.8}} className='intr-btn-submit' {...props}>
        <p>Submit</p>
    </motion.div>
  )
}

export default IntrBtn