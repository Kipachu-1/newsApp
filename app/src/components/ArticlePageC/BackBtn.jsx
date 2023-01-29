import React from 'react'
import leftArrow from '../../static/icons/left-arrow.svg'
const BackBtn = ({...props}) => {
  return (
    <div className='back-btn unselectable' {...props}>
        <img src={leftArrow} alt="" />
    </div>
  )
}

export default BackBtn