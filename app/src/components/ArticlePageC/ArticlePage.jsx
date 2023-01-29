import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthorInfo from '../ArticleCard/AuthorInfo'
import { motion, AnimatePresence, spring } from "framer-motion"
import { ArticleDataR, ArticleVisible } from '../../context/MainContex'
import BackBtn from './BackBtn'
import ActBtns from './ActBtns'
import ImgContainer from './ImgContainer'

const ArticlePage = ({article_data}) => {
    const {ArVisible, setArVisible} = useContext(ArticleVisible)
    const {ArticleData} = useContext(ArticleDataR)
    const backClick = ()=>{
      setArVisible(false)
    }
  return (
    <AnimatePresence>
      {ArVisible && (
        <motion.div 
        initial={{ left: '100%', opacity:0}}
        animate={{ left:'0', opacity:1}}
        exit={{left:'110%', opacity:0, right:'-110%'}}
        transition={{duration:0.15}}
        className='article-page' style={{backgroundColor: ArticleData.backColor}}> 
        <div className='article-content'>
            <div className='top-controls'>
                <BackBtn onClick={backClick}/>
            </div>
            <div className='article-title'>
                <h1>
                {article_data.title}
                </h1>
            </div>
            <AuthorInfo author_data={article_data.author}/>
            <div className='article-body'>
                {article_data.text.split(/(?:\r?\n)+/).map((paragraph, index)=>{
                    return <div key={index}>
                       {paragraph.substring(0, 10)!=="<img-here>"
                       ?paragraph
                       :<ImgContainer inputString={paragraph} imgList={article_data.images}/>}
                    </div>
                })}
            </div>
        </div>
        <ActBtns article_data={article_data}/>
    </motion.div>
      )}
    </AnimatePresence>
    
  )
}

export default ArticlePage