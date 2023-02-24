import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { ArticleDataR, ArticleVisible, AuthorPageVisible } from '../context/MainContex';
import { ArticleUtil } from '../utilities/ArticleUtil';
const ArticleBlock = ({article_data, customBackColor, customFontColor}) => {
    const {AuthorVisible, setAuthorVisible} = useContext(AuthorPageVisible)
    const {ArVisible, setArVisible} = useContext(ArticleVisible);
    const {setArticleData} = useContext(ArticleDataR);
    const defaultbackcolor = ArticleUtil.getRandomColor().backColor;
    const handleClick = ()=>{
      setArticleData({...article_data, backColor:defaultbackcolor}); setArVisible(true);
      if(AuthorVisible.state && ArVisible){
        setAuthorVisible({...AuthorVisible, state:false})
      }
    }
  return (
    <motion.div className={`article-block unselectable`} whileTap={{scale:0.95}} style={{backgroundColor:customBackColor || article_data.backColor || defaultbackcolor}}
    onClick={handleClick}>
        <div className='article-block-title' style={{color:customFontColor}}>
            <h1 >
                {article_data.title.length> 50?
                article_data.title.substring(0, 50)+"...":
                article_data.title}
            </h1>
        </div>
    </motion.div>
  )
}

export default ArticleBlock