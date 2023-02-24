import React, { useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArticleDataR } from '../../context/MainContex';
import { DomUtil } from '../../utilities/DomUtil';
import { DataManager } from '../../utilities/DataManager';
const ColorChanger = () => {
    const [visible, setVisible] = useState(false);
    const colorList = ['#ffe8e5', '#fff2c5', '#e0f1ff', '#ffffff', '#f1d0fd', '#111111'];
    const {ArticleData,setArticleData} = useContext(ArticleDataR);
    const handleColor = (color)=>{
        setArticleData({...ArticleData, backColor:color})
        DomUtil.setThemeColor(color)
        DomUtil.setBackColor(color)
        if(color === '#111111'){
          DataManager.setArticleSettings('white', color)
        } else {
          DataManager.setArticleSettings('black', color)
        }
    }
  return (
    <div onClick={()=>{setVisible(!visible)}} className='unselectable'>
        <div className='color-container' style={{backgroundColor:ArticleData.backColor}}></div>
        <AnimatePresence>
        {visible && (<div className='color-list'>
        {colorList.map((color, index)=>{
            return <motion.div  
            key={index}
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            exit={{opacity:0}}  className='color-container color-container-list' onClick={()=>{
              if(ArticleData.backColor !== color)handleColor(color)
            }}
            style={{backgroundColor:color}}>
            </motion.div>
        })}
        </div>)}
        </AnimatePresence>
        
        
    </div>
    
  )
}

export default ColorChanger