import React from 'react'
import { ArticleUtil } from '../../utilities/ArticleUtil'
const TopicBlock = ({topic, onClick}) => {
  return (
    <div className='topic-block' onClick={onClick}>
        <div className='topic-block-title'>
            <h1 style={{color:"white"}}>
                {topic}
            </h1>
        </div>
    </div>
  )
}

export default TopicBlock