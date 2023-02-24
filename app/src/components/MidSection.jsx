import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useQuery } from 'react-query'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import ArticleCard from './ArticleCard/ArticleCard'
import { APIservice } from '../API/APIservice'
import {CurrentInterest } from '../context/MainContex'
const MidSection = () => {
  const {CurInterest} = useContext(CurrentInterest);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [articles, setArticles] = useState([]);
  const {data, refetch} = useQuery('Articles-list', ()=>{
    APIservice.getNews(CurInterest, page).then((response)=>{
      setArticles(articles.concat(response.articles));
      setTotalPages(response.total_pages);
    })
  }, {refetchOnWindowFocus:false, enabled:false})
  const [Currentindex, setIndex] = useState(0);
  
  const handleChange = ()=>{
    setIndex(0)
    setPage(1)
    APIservice.getNews(CurInterest, 1).then((response)=>{
      setArticles(response.articles);
      setTotalPages(response.total_pages);
    })
  }
  useEffect(()=>{
    handleChange()
  }, [CurInterest, ])


  let touchstartX = 0
  let touchendX = 0
  
  function checkDirection() {
  if(touchendX-touchstartX < -80 || touchendX-touchstartX > 80 ){
  if (touchendX < touchstartX){
      if(Currentindex!==articles.length-1){
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
  useEffect(()=>{
    refetch()
  }, [page])
  const SwipeLeft = () => {
    if(articles.length-2 === Currentindex
      && totalPages > page){
      setPage(page+1)
    }
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
          {
            articles.length > 0 ? <ArticleCard article_data={articles[Currentindex]}/>:"nothing"
          }
    </div>
  )
}

export default MidSection