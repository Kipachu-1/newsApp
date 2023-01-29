import React, { useEffect, useState } from 'react'
import share from '../../static/icons/share.svg'
import like from '../../static/icons/like.svg'
import save from '../../static/icons/saveIcon.svg'
import saveF from '../../static/icons/saveF.svg'
import likeF from '../../static/icons/likeF.svg'

import { motion } from 'framer-motion'
import { DataManager } from '../../utilities/DataManager'
const ActBtns = ({article_data}) => {
  const [inSaved, setInSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disabled, setDisabled] = useState(false)
  useEffect(()=>{
    DataManager.inSavedNews(article_data).then(response=>{
      if(response){
        setInSaved(true)
      } else {
        setInSaved(false)
      }
    })
  }, [article_data])
  const handleSave =()=>{
    if(!disabled){
      setDisabled(true)
    if(inSaved){
      DataManager.updateSavedNews('remove', article_data)
      setInSaved(false)
    } else {
      DataManager.updateSavedNews('add', article_data)
      setInSaved(true)
    }
  }
  setTimeout(()=>{
    setDisabled(false)}, 2000)
  }
  const handleLike =()=>{
      setLiked(!liked)
  }

  return (
    <div className='article-act-container unselectable'>
        <motion.div whileTap={{scale:1.2}} className='act-btn-container' onClick={handleLike}>
            <img src={liked?likeF:like} alt="" />
        </motion.div>
        <motion.div whileTap={{scale:1.2}} className='act-btn-container' onClick={handleSave}> 
            <img src={inSaved?saveF:save} alt="" />
        </motion.div>
        <motion.div whileTap={{scale:1.2}} className='act-btn-container'>
            <img src={share} alt="" />
        </motion.div>
    </div>
  )
}

export default ActBtns