import React from 'react'
import featherIcon from '../../static/icons/feather.svg'
const WriterLoader = ({text}) => {
  return (
    <div className='writer-loader'>
        <div className='loader-body'>
            <div className='loader-icon'>
                <img src={featherIcon} alt="" />
            </div>
            <div className='loader-text'>
                <p>{text}</p>
            </div>
        </div>
    </div>
  )
}

export default WriterLoader