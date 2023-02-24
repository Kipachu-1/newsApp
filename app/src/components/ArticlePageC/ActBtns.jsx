import React, { useEffect, useState } from 'react'
import share from '../../static/icons/share.svg'
import like from '../../static/icons/like.svg'
import save from '../../static/icons/saveIcon.svg'
import saveF from '../../static/icons/saveF.svg'
import likeF from '../../static/icons/likeF.svg'

import { motion } from 'framer-motion'
import { DataManager } from '../../utilities/DataManager'
import { APIservice } from '../../API/APIservice'
const ActBtns = ({article_data}) => {
  const [inSaved, setInSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [ldisabled, setlDisabled] = useState(false);

  useEffect(()=>{
    DataManager.inSavedNews(article_data).then(response=>{
      if(response){
        setInSaved(true)
      } else {
        setInSaved(false)
      }
    })
    DataManager.inLikedArticles({UID:article_data.UID}).then(response=>{
      if(response){
        setLiked(true)
      } else {
        setLiked(false)
      }
    })
  }, [article_data])
 
  const handleLike =()=>{
    if(!ldisabled){
      setlDisabled(true)
    if(liked){
      DataManager.updateLikedArticles('remove', {UID:article_data.UID})
      setLiked(false)
      APIservice.likeArticle(article_data.UID, 'remove')
    } else {
      DataManager.updateLikedArticles('add', {UID:article_data.UID})
      setLiked(true)
      APIservice.likeArticle(article_data.UID, 'add')
    }
  }
  setTimeout(()=>{
    setlDisabled(false)}, 2000)
  }
  const handleSave =()=>{
    if(!disabled){
      setDisabled(true)
    if(inSaved){
      DataManager.updateSavedNews('remove', article_data)
      setInSaved(false)
      APIservice.saveArticle(article_data.UID, 'remove')
    } else {
      DataManager.updateSavedNews('add', article_data)
      setInSaved(true)
      APIservice.saveArticle(article_data.UID, 'add')
    }
  }
  setTimeout(()=>{
    setDisabled(false)}, 2000)
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