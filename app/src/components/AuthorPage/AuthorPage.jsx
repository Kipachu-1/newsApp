import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { APIservice } from '../../API/APIservice'
import {ArticleVisible, AuthorPageVisible } from '../../context/MainContex'
import arrowIcon from '../../static/icons/arrow.svg'
import ArticleBlock from '../ArticleBlock'
import AuthorInfoBlock from './AuthorInfoBlock'
import { motion, AnimatePresence } from 'framer-motion'

const AuthorPage = () => {
    const {AuthorVisible, setAuthorVisible} = useContext(AuthorPageVisible);
    const {ArVisible} = useContext(ArticleVisible);
    const [zIndex, setzIndex] = useState(13);
    const {data, refetch} = useQuery(['Author-data', AuthorVisible], ()=>{
        return APIservice.getAuthorData(AuthorVisible.name).then((data)=>{
            return data});
    }, {refetchOnWindowFocus:false, enabled:false});
    const [nameInView, setNameInView] = useState(false)

    useEffect(()=>{
        if(ArVisible && !AuthorVisible.state){
            setzIndex(13)
        } else {
            setzIndex(11)
        }
    }, [ArVisible])

    useEffect(()=>{
        if(AuthorVisible.name !=='' && AuthorVisible.state===true){
            refetch()
        }
    }, [AuthorVisible.state])

    let touchstartX = 0;
    let touchendX = 0;
    let touchstartY = 0;
    let touchendY = 0;

    function checkDirection() {
      if(touchendX-touchstartX > -40){
        if(touchstartY-touchendY < 40 && touchendY-touchstartY > -40 && touchstartY-touchendY > 10){
            setAuthorVisible(false)
        }
    }
      }
  return (
    <AnimatePresence>{
        AuthorVisible.state &&
    <motion.div 
    initial={{right:'-100%', left:'100%'}}
    animate={{right:'0',left:'0'}}
    exit={{right:'-100%', left:'100%'}}
    onTouchStart={e => {
        touchstartX = e.changedTouches[0].screenX
        touchstartY = e.changedTouches[0].screenY
        }} onTouchEnd={e => {
            touchendX = e.changedTouches[0].screenX
            touchendY = e.changedTouches[0].screenY
            checkDirection()
            }}
    className='Author-page unselectable' style={{zIndex:zIndex}}>
        <div className='Author-page-content'>
        <div className='Author-page-bar'>
            <div className='Author-page-bar-btn'>
                <img src={arrowIcon} alt="" onClick={()=>{setAuthorVisible(false)}}/>
            </div>
            <div className='Author-page-bar-info' style={{opacity:nameInView?"1":'0'}}>
                <p className='Author-page-bar-name'>
                    {AuthorVisible.name}
                </p>
                <span>
                    {data?.followers} followers
                </span>
            </div>
        </div>
        <AuthorInfoBlock author_data={data} setNameInView={setNameInView}/>
        <div className='Author-page-articles'>
        {data?.articles.map((article, index)=>{
            return <ArticleBlock article_data={article} key={index} customFontColor={'white'} customBackColor={'#111111'}/>
        })}
        </div>
        </div>
    </motion.div>}
    </AnimatePresence>
  )
}

export default AuthorPage