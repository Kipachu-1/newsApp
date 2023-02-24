import React from 'react'
import searchIcon from '../../static/icons/searchIcon.svg'
import { motion } from 'framer-motion'
const SearchBar = ({onChange, value, CustomIcon, CustomPlaceholder, ...props}) => {
  return (
    <div className='search-bar'>
        <div className='search-input-container'>
            <input type="text" className='search-input text-box' placeholder={CustomPlaceholder?CustomPlaceholder:'Search news'} value={value} onChange={onChange}/>
        </div>
        <motion.div className='search-btn-container' whileTap={{scale:1.3}}  onClick={props.handleSearchClick}> 
                <img src={CustomIcon?CustomIcon:searchIcon} alt="" />
        </motion.div>
    </div>
  )
}

export default SearchBar