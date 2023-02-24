import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { APIservice } from '../../API/APIservice';
import { ArticleVisible, AuthorPageVisible, isSignedIn, LoginVisible } from '../../context/MainContex'
import { DataManager } from '../../utilities/DataManager';
import { motion } from 'framer-motion';
const AuthorInfo = ({author_data, ...props}) => {
    const {AuthorVisible, setAuthorVisible} = useContext(AuthorPageVisible);
    const {ArVisible, setArVisible} = useContext(ArticleVisible)
    const {LogVisible, setLogVisible} = useContext(LoginVisible);
    const {isSignedInS, setIsSignedInS} = useContext(isSignedIn);
    const [Subscribed, setSubscribed] = useState(false);
    const [disabled, setDisabled] = useState(false);
    useEffect(()=>{
        DataManager.inSubs(author_data).then((response)=>{
            if(response){
                setSubscribed(true)
            } else {
                setSubscribed(false)
            }
        })
    }, [author_data])
    const handleFollow =()=>{
        if(!isSignedInS){
            setLogVisible(true)
            return 
        }
        if(!disabled){
          setDisabled(true)
        if(Subscribed){
          DataManager.updateSubs('remove', author_data)
          setSubscribed(false)
          APIservice.followAuthor(author_data.name, 'remove');
        } else {
          DataManager.updateSubs('add', author_data)
          setSubscribed(true)
          APIservice.followAuthor(author_data.name, 'add');
        }
      }
      setTimeout(()=>{
        setDisabled(false)}, 2000)
      }

      const AuthorClick = ()=>{
        if(AuthorVisible.state && ArVisible){
            setArVisible(false);
        } else {
            setAuthorVisible({name:author_data.name, state:true})
        }
      }
  return (
    <motion.div  whileTap={{}}  className='card-author-info' {...props}>
        <div className='author-main'>
            <div className='card-author-avatar' onClick={AuthorClick}>
                <img src={author_data.avatar} alt="" />
            </div>
            <div className='card-main-block'>
                <p>Published by</p>
                <p className='card-author-name'>
                    {author_data.name}
                </p>
            </div>
            </div>
        <div>
        <div className='card-follow-btn' onClick={handleFollow}>
            <p>
                {Subscribed?'Followed':'Follow'}</p>
        </div>
        </div>
    </motion.div>
  )
}

export default AuthorInfo