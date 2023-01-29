import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { ArticleDataR, ArticleVisible } from '../context/MainContex';
import { ArticleUtil } from '../utilities/ArticleUtil';
const ArticleBlock = ({article_data}) => {
    const {setArVisible} = useContext(ArticleVisible);
    const {setArticleData} = useContext(ArticleDataR);
    const defaultbackcolor = ArticleUtil.getRandomColor().backColor;
  return (
    <motion.div className={`article-block unselectable`} whileTap={{scale:0.95}} style={{backgroundColor:article_data.backColor || defaultbackcolor}}
    onClick={()=>{setArticleData({...article_data, backColor:defaultbackcolor}); setArVisible(true);}}>
        <div className='article-block-title'>
            <h1 >
                {article_data.title.substring(0, 50)}...
            </h1>
        </div>
        {/* <div className='article-block-text'>
            <p>
                {article_data.text.substring(0, 200)}...
            </p>
        </div> */}
    </motion.div>
  )
}

export default ArticleBlock