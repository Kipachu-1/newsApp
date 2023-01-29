import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { ArticleUtil } from '../../utilities/ArticleUtil'
const ImgContainer = ({inputString, src, imgList, ...props}) => {
  const [img, setImg] = useState('');
  useEffect(()=>{
        if(src) {
          setImg(src)
        } else if(ArticleUtil.isLink(ArticleUtil.getImgLink(inputString))){
          setImg(ArticleUtil.getImgLink(inputString))
        } else {
          let filteredImages = imgList.filter(img => img.image.includes(ArticleUtil.getImgLink(inputString)));
          setImg(filteredImages[0].image)
        }
  }, [])
    return (
    <div className='article-img-container'>
        <img src={img} alt="" />
    </div>
  )
}

export default ImgContainer