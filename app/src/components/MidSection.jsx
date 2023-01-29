import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useQuery } from 'react-query'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import ArticleCard from './ArticleCard/ArticleCard'
import { APIservice } from '../API/APIservice'
import { CurrentInterest } from '../context/MainContex'
const MidSection = () => {
  const {CurInterest} = useContext(CurrentInterest)
  const {data, refetch} = useQuery('Articles-list', ()=>{
    return APIservice.getNews(CurInterest)
  }, {refetchOnWindowFocus:false, enabled:false})
  const [Currentindex, setIndex] = useState(0);
  
  const handleChange = ()=>{
    refetch()
  }
  useEffect(()=>{
    handleChange()
  }, [CurInterest, ])

  let touchstartX = 0
  let touchendX = 0
  
  function checkDirection() {
  if(touchendX-touchstartX < -80 || touchendX-touchstartX > 80 ){
  if (touchendX < touchstartX){
      if(Currentindex!==data.length-1){
          setIndex(Currentindex+1)
          SwipeLeft();
      }
  }
  if (touchendX > touchstartX){
      if(Currentindex!==0){
          setIndex(Currentindex-1)
          SwipeRight()
      }
  }}
  }
  const SwipeLeft = () => {
    setIndex(Currentindex+1);
    };
  const SwipeRight = () => { 
    setIndex(Currentindex-1);
    };
  return (
    <div className='mid-section'  onTouchStart={e => {
      touchstartX = e.changedTouches[0].screenX
      }} onTouchEnd={e => {
          touchendX = e.changedTouches[0].screenX
          checkDirection()
          }}>
          {data?.length>0?<ArticleCard article_data={data[Currentindex]}/>
          :''}
    </div>
  )
}

export default MidSection