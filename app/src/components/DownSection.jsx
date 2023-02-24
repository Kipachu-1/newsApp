import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { SavePageVisible, SearchPageVisible, WriterVisible } from '../context/MainContex'
import homeIcon from '../static/icons/homeIcon.svg'
import saveIcon from '../static/icons/saveF.svg'
import searchIcon from '../static/icons/searchIcon.svg'
import feather from '../static/icons/feather.svg'


const DownSection = () => {
  const [active, setActive] = useState({home:true})
  const handleClick = (btn_name) =>{
    setActive({[btn_name]:true})
  }
  const {SVisible,setSVisible} = useContext(SavePageVisible)
  const {SearchVisible, setSearchVisible} = useContext(SearchPageVisible)
  const {WriterVisibleC, setWriterVisibleC} = useContext(WriterVisible)


  useEffect(()=>{
    if(!SVisible){
      handleClick('home')
    }
  }, [SVisible, SearchVisible])
  return (
    <div className='down-section unselectable'>
        <div className='down-section-content'>
            <div className='bar-container'>
            <div className={`icon-container ${!SearchVisible && !SVisible && !WriterVisibleC&&'icon-container-active'}`}
            onClick={()=>{setSearchVisible(false); setSVisible(false); setWriterVisibleC(false)}}>
              <img src={homeIcon} alt="" />
            </div>
            <div className={`icon-container ${SearchVisible&&'icon-container-active'}`}
            onClick={()=>{setSearchVisible(true); setSVisible(false); setWriterVisibleC(false);}}>
              <img src={searchIcon} alt="" />
            </div>
            <div className={`icon-container ${SVisible&&'icon-container-active'}`}
            onClick={()=>{setSVisible(true); setSearchVisible(false); setWriterVisibleC(false);}}>
              <img src={saveIcon} alt="" />
            </div>
            <div className={`icon-container ${WriterVisibleC&&'icon-container-active'}`}
            onClick={()=>{setSVisible(false); setSearchVisible(false);setWriterVisibleC(true)}}>
              <img src={feather} alt="" />
            </div>
            </div>
        </div>
    </div>
  )
}

export default DownSection