import React, { useEffect, useState } from 'react'
import share from '../../static/icons/share.svg'
import like from '../../static/icons/like.svg'
import save from '../../static/icons/saveIcon.svg'
import saveF from '../../static/icons/saveF.svg'
import likeF from '../../static/icons/likeF.svg'
import { DataManager } from '../../utilities/DataManager'
import { motion } from 'framer-motion'
const CardBtns = ({article_data, btnColor}) => {
  const [inSaved, setInSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
      console.log('a');
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
  return (
    <div className='card-footer'>
        <motion.div whileTap={{scale:1.1}} className='footer-btn' >
            <img src={like} alt="" style={{filter:btnColor}}/>
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