import React, { useContext, useEffect, useState} from 'react'
import AuthorInfo from '../ArticleCard/AuthorInfo'
import { motion, AnimatePresence, spring } from "framer-motion"
import { ArticleDataR, ArticleVisible } from '../../context/MainContex'
import BackBtn from './BackBtn'
import ActBtns from './ActBtns'
import ImgContainer from './ImgContainer'
import ColorChanger from './ColorChanger'
import { DataManager } from '../../utilities/DataManager'

const ArticlePage = ({article_data}) => {
    const {ArVisible, setArVisible} = useContext(ArticleVisible)
    const {ArticleData} = useContext(ArticleDataR)
    const [ArticleSets, setArticleSets] = useState(false)
    
    useEffect(()=>{
      DataManager.getArticleSettings().then((sets)=>{
        setArticleSets(sets)
      })
    }, [ArVisible, ArticleData.backColor])

    const backClick = ()=>{
      setArVisible(false)
    }

    let touchstartX = 0
    let touchendX = 0
    let touchstartY = 0
    let touchendY = 0

    function checkDirection() {
      if(touchendX-touchstartX > -40){
        if(touchstartY-touchendY < 40 && touchendY-touchstartY > -40 && touchstartY-touchendY > 10){
              setArVisible(false)
            }
    }
      }
  
  return (
    <AnimatePresence>  
      {ArVisible && (
        <motion.div 
        onTouchStart={e => {
          touchstartX = e.changedTouches[0].screenX
          touchstartY = e.changedTouches[0].screenY
          }} onTouchEnd={e => {
              touchendX = e.changedTouches[0].screenX
              touchendY = e.changedTouches[0].screenY
              checkDirection()
              }}
        initial={{ left: '100%', opacity:0}}
        animate={{ left:'0', opacity:1}}
        exit={{left:'100%', opacity:0}}
        transition={{duration:0.15}}
        className='article-page' style={{backgroundColor:ArticleSets?ArticleSets.backColor:ArticleData.backColor, color:ArticleSets?ArticleSets.fontColor:
        ''}}
        onScroll={()=>{}}> 
        <div className='article-content' >
            <div className='top-controls'>
                <BackBtn onClick={backClick}/>
                <ColorChanger/>
            </div>
            <div className='article-title'>
                <h1>
                {article_data.title}
                </h1>
            </div>
            <AuthorInfo author_data={article_data.author} zindex={12}/>
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