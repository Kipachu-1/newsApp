import React, { useContext, useEffect, useState } from 'react'
import { ArticleDataR, ArticleVisible, WriterVisible } from '../../context/MainContex'
import { AnimatePresence, motion } from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar';
import featherIcon from '../../static/icons/feather.svg';
import TopicBlock from './TopicBlock';
import { useQuery } from 'react-query'
import { APIservice } from '../../API/APIservice';
import WriterLoader from './WriterLoader';
const WriterPage = () => {
    const {setArVisible} = useContext(ArticleVisible)
    const {setArticleData} = useContext(ArticleDataR);
    const {WriterVisibleC, setWriterVisibleC} = useContext(WriterVisible)
    const [query, setQuery] = useState('');
    const [title, setTitle] = useState('');
    const [topics, setTopics] = useState(['Artificial Intelligence: The Future of Technology', 'AI and the Digital Revolution'])
    const {isFetching:topicsFetching, refetch} = useQuery('writer-topics', ()=>{
      return APIservice.getTopicsList(query).then((response)=>{
        setTopics(response)
        return response
      })
    },
    {refetchOnWindowFocus:false, enabled:false})

    const {articleData,isLoading:writeLoading  ,isFetching:writeFetching, refetch:write, cancel} = useQuery('Written-Article', ()=>{
      return APIservice.getWriterArticle(title).then((response)=>{
        setArticleData(response);
        setArVisible(true)
      })
    },
    {refetchOnWindowFocus:false, enabled:false})

    const handleListClick = ()=>{
      if(query!==''){
        refetch()
      }
    }
    useEffect(()=>{
      if(title!==''){
        write()
      }
    }, [title])

    return (
      
    <AnimatePresence>
      {topicsFetching&&<WriterLoader text={'Topics...'} key={12}/>}
        {writeFetching&&<WriterLoader text={'Writing...'} key={14}/>}
        { WriterVisibleC &&
    
    <motion.div className='writer-page'
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.2}}>
        

        <SearchBar CustomIcon={featherIcon} CustomPlaceholder={'Topic or key words'} 
        onChange={(e)=>{setQuery(e.target.value)}} handleSearchClick={handleListClick}/>
        <div className='writer-list-container'>
          {
            topics.length > 0 &&
            topics.map((item, index)=>{
              return <TopicBlock topic={item} key={index} onClick={()=>{setTitle(item);
              if(title===item){setArVisible(true)}}}/>
            })
          }
        </div>
    </motion.div>
    }
    </AnimatePresence>
  )
}

export default WriterPage