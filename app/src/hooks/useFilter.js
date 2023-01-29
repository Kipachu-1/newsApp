import { useState } from 'react';

function useFilter(list) {
  const [filteredList, setFilteredList] = useState(list);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setFilteredList(list.filter(item =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    ));
  };

  return {filteredList, searchTerm, handleSearch };
}

export default useFilter;