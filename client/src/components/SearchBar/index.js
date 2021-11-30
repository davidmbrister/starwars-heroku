import React from 'react';
import { useCardId } from '../../hooks/useCard';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';


const SearchBar = () => {
  const {setCardData} = useCardId()
  const useSearchStarwarsHero = () => useDebouncedSearch(text => setCardData(text))
  const { inputText, setInputText, searchResults } = useSearchStarwarsHero();
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"#93E9BE 2px inset", padding:"0.5rem", borderRadius: '4px'};
  return (
    <>
    <input 
     style={BarStyling}
     value={inputText}
     placeholder={"Search character by ID"}
     onChange={(e) => setInputText(e.target.value)}
    />
    <p style={{color: 'white'}}>
      {searchResults.loading && 'Processing input...'}
      {searchResults.error && 'Error: ' && searchResults.error.message}
    </p>
    </>
  );
}

export default SearchBar
