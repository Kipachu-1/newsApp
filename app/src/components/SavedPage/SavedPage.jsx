import React, { useContext, useEffect, useState } from 'react'
import BackBtn from '../ArticlePageC/BackBtn'
import { AnimatePresence, motion } from 'framer-motion'
import { SavePageVisible, SearchPageVisible } from '../../context/MainContex'
import SearchBar from '../SearchBar/SearchBar'
import ArticleBlock from '../ArticleBlock'
import { DataManager } from '../../utilities/DataManager'
import useFilter from '../../hooks/useFilter'
import useSearch from '../../hooks/useSearch'
const SavedPage = () => {
  const {SVisible, setSVisible} = useContext(SavePageVisible)
  const {SearchVisible, setSearchVisible} = useContext(SearchPageVisible)
  const [savedNews, setSavedNews] = useState([]);
  const [result, setResult] = useState([])
  const [Visible, setVisible] = useState(false)

  useEffect(()=>{
    if(SearchVisible || SVisible){
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [SearchVisible, SVisible])
  const {filteredList, searchTerm, handleSearch} = useFilter(savedNews)
  const {searchList, searchQ, handleSearchQ} = useSearch();


  useEffect(()=>{
      if(SVisible){
        setResult(filteredList)
      } else {
        setResult(searchList)
      }
  }, [filteredList, searchList])

  useEffect(()=>{
    if(SVisible && !SearchVisible){
      DataManager.getSavedNews().then(data=>{setResult(data);});
    } else {
      setResult([])
    }
  }, [SVisible, SearchVisible])

  const handleSearchClick = ()=>{
    if(SVisible){
      setSVisible(false);
      setSearchVisible(true);
      setResult([])
    } else if(SearchVisible) {
      setSearchVisible(false);
      setSVisible(true);
    }
  }

  return (
    <AnimatePresence>
    {Visible && <motion.div 
    initial={{bottom:'-110%', top:'110%'}}
    animate={{bottom:'0', top:'30px'}}
    exit={{bottom:'-110%', top:'110%'}}
    transition={{ duration: 0.5,type: "spring" }}

     className='Save-page unselectable'>
          <div className='save-page-header' >
              <BackBtn style={{filter:'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)', transform:'rotate(270deg)'}}
              onClick={()=>{setSVisible(false); setSearchVisible(false)}}/>
              <div className='save-header-name'>
                <h1>
                  {SVisible&&'Saved news'}
                  {SearchVisible&&'Search news'}
                </h1>
              </div>
          </div>
          {SVisible?
          <SearchBar onChange={handleSearch}  handleSearchClick={handleSearchClick}/>
          :<SearchBar onChange={handleSearchQ}  handleSearchClick={handleSearchClick}/>
          }
          <div className='save-articles-container'>
              {
                result.length > 0?
                result.map((item, index)=>{return <ArticleBlock key={index} article_data={item}/>})
                : ''
              }
          </div>
    </motion.div>}
    </AnimatePresence>
  )
}

export default SavedPage