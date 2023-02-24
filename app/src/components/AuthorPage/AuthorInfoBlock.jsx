import React, { useContext, useEffect, useState } from 'react'
import { APIservice } from '../../API/APIservice';
import { isSignedIn, LoginVisible } from '../../context/MainContex';
import { DataManager } from '../../utilities/DataManager';
import { motion } from 'framer-motion';
const AuthorInfoBlock = ({author_data, ...props}) => {
    const [desExpanded, setDesExpanded] = useState(false);
    const [followed, setFollowed] = useState(false);
    const {LogVisible, setLogVisible} = useContext(LoginVisible);
    const {isSignedInS, setIsSignedInS} = useContext(isSignedIn);
    const [disabled, setDisabled] = useState(false);
    const handleFollow = ()=>{
        if(!isSignedInS){
            setLogVisible(true)
            return 
        }
        if(!disabled){
          setDisabled(true)
        if(followed){
          DataManager.updateSubs('remove', author_data)
          setFollowed(false)
          APIservice.followAuthor(author_data.name, 'remove');
        } else {
          DataManager.updateSubs('add', author_data)
          setFollowed(true)
          setFollowed.followAuthor(author_data.name, 'add');
        }
      }
    }

    useEffect(()=>{
            if(author_data){
            DataManager.inSubs(author_data).then((state)=>{
            if(state){
                setFollowed(true);
            } else {
                setFollowed(false)
            }
        })}
    }, [author_data])
    

  return (
    <div className='author-page-info'>
        <div className='top-info'>
            <div className='top-main-info'>
                <motion.div className='author-name' onViewportEnter={()=>{props.setNameInView(false)}} onViewportLeave={()=>{props.setNameInView(true)}}>
                    <h1>{author_data?.name}</h1>
                </motion.div>
                <div className='author-numbers'>
                    <div className='number-followers number-holder'>
                        <p className='number-p'>{author_data?.followers}</p>
                        <span className='top-span'>followers</span>
                    </div>
                    {/* <div className='number-follows number-holder'>
                        <p className='number-p'>4</p>
                        <span className='top-span'>follows</span>
                    </div> */}
                </div>
            </div>
            <div className='top-img-container'>
                    <img src={author_data?.avatar} alt="" />
            </div>
        </div>
        <div className='mid-info unselectable'>
            <p className='mid-description' onClick={()=>{setDesExpanded(!desExpanded)}}>
                {author_data?.description!==null?
                desExpanded?author_data?.description:
                author_data?.description.length > 110?author_data?.description.substring(0, 110)+"...":author_data?.description:''
                }
            </p>
        </div>
        <div className='author-follow-btn unselectable' onClick={handleFollow}>
            {followed?"Followed":"Follow"}
        </div>
    </div>
  )
}

export default AuthorInfoBlock