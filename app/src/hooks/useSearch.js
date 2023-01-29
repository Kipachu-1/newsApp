import { useState } from 'react';
import { APIservice } from '../API/APIservice';
function useSearch() {
  const [searchList, setSearchList] = useState([]);
  const [searchQ, setSearchQ] = useState('');

  const handleSearchQ = event => {
    setSearchQ(event.target.value);
    if(event.target.value !== ''){
      APIservice.searchNews(event.target.value).then((result)=>{
      setSearchList(result)
    })}
  };

  return {searchList, searchQ, handleSearchQ };
}

export default useSearch;