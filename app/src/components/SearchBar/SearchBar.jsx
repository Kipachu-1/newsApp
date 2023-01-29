import React from 'react'
import searchIcon from '../../static/icons/searchIcon.svg'
import { motion } from 'framer-motion'
const SearchBar = ({onChange, value, ...props}) => {
  return (
    <div className='search-bar'>
        <div className='search-input-container'>
            <input type="text" className='search-input text-box' placeholder='Search news' value={value} onChange={onChange}/>
        </div>
        <motion.div className='search-btn-container' whileTap={{scale:1.3}}  onClick={props.handleSearchClick}> 
                <img src={searchIcon} alt="" />
        </motion.div>
    </div>
  )
}

export default SearchBar