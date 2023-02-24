import React, { useEffect, useState } from 'react'
import share from '../../static/icons/share.svg'
import like from '../../static/icons/like.svg'
import save from '../../static/icons/saveIcon.svg'
import saveF from '../../static/icons/saveF.svg'
import likeF from '../../static/icons/likeF.svg'
import { DataManager } from '../../utilities/DataManager'
import { motion } from 'framer-motion'
import { APIservice } from '../../API/APIservice'
const CardBtns = ({article_data, btnColor}) => {
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
  return (
    <div className='card-footer'>
        <motion.div whileTap={{scale:1.1}} className='footer-btn'
        onClick={handleLike} >
            <img src={liked?likeF:like} alt="" style={{filter:btnColor}}/>
        </motion.div>
        <motion.div whileTap={{scale:1.1}} className='footer-btn'  onClick={handleSave}>
            <img src={inSaved?saveF:save} alt="" style={{filter:btnColor}}/>
        </motion.div>
        <motion.div whileTap={{scale:1.1}} className='footer-btn'  >
            <img src={share} alt="" style={{filter:btnColor}}/>
        </motion.div>
    </div>
  )
}

export default CardBtns