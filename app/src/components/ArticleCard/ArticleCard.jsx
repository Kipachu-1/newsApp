import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ArticleDataR, ArticleVisible } from '../../context/MainContex'
import { ArticleUtil } from '../../utilities/ArticleUtil'
import AuthorInfo from './AuthorInfo'
import CardBtns from './CardBtns'
const ArticleCard = ({article_data, ...props}) => {
    const {setArVisible} = useContext(ArticleVisible);
    const {setArticleData} = useContext(ArticleDataR);
    const [colors, setColors]= useState('');
    useEffect(()=>{
        setColors(ArticleUtil.getRandomColor())
    }, [article_data])
    const ReadClick = ()=>{
        article_data.backColor = colors.backColor
        setArVisible(true);
        setArticleData(article_data)
    }
  return (
    <motion.div  whileTap={{scale:0.95}}
    className='article-card-container unselectable' >
    <div className='article-card' onClick={ReadClick} style={{backgroundColor:colors.backColor}}>
        <div className='card-title'>
            <h1>
                {article_data.title.substring(0, 47)}...
            </h1>
        </div>
        <p className='card-updated-at'>
            {article_data?.updated}
        </p>
        <AuthorInfo author_data={article_data?.author}/>
        <div className='card-text'>
            {article_data?.text.substring(0, 320)}...
        </div>
    </div>
    <CardBtns article_data={{...article_data, backColor:colors.backColor}} btnColor={colors.filterColor}/>
    </motion.div>
  )
}

export default ArticleCard