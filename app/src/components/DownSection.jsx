import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { SavePageVisible, SearchPageVisible } from '../context/MainContex'
import homeIcon from '../static/icons/homeIcon.svg'
import saveIcon from '../static/icons/saveF.svg'
import searchIcon from '../static/icons/searchIcon.svg'

const DownSection = () => {
  const [active, setActive] = useState({home:true})
  const handleClick = (btn_name) =>{
    setActive({[btn_name]:true})
  }
  const {SVisible,setSVisible} = useContext(SavePageVisible)
  const {SearchVisible,setSearchVisible} = useContext(SearchPageVisible)

  useEffect(()=>{
    if(!SVisible){
      handleClick('home')
    }
  }, [SVisible, SearchVisible])
  return (
    <div className='down-section unselectable'>
        <div className='down-section-content'>
            <div className='bar-container'>
            <div className={`icon-container ${active.home&&'icon-container-active'}`}
            onClick={()=>{handleClick('home')}}>
              <img src={homeIcon} alt="" />
            </div>
            <div className={`icon-container ${active.search&&'icon-container-active'}`}
            onClick={()=>{handleClick('search'); setSearchVisible(true)}}>
              <img src={searchIcon} alt="" />
            </div>
            <div className={`icon-container ${active.saved&&'icon-container-active'}`}
            onClick={()=>{handleClick('saved'); setSVisible(true)}}>
              <img src={saveIcon} alt="" />
            </div>
            </div>
        </div>
    </div>
  )
}

export default DownSection