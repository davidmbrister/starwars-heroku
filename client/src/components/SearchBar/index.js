import React from 'react';
import { useCardId } from '../../hooks/useCard';
import debounce from 'lodash.debounce';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';


const SearchBar = () => {
  const {setCardData} = useCardId()
  const useSearchStarwarsHero = () => useDebouncedSearch(text => setCardData(text))
  const { inputText, setInputText, searchResults } = useSearchStarwarsHero();
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"black 1px dotted", padding:"0.5rem"};
  return (
    <>
    <input 
     style={BarStyling}
     value={inputText}
     placeholder={"Search character by ID"}
     onChange={(e) => setInputText(e.target.value)}
    />
    <p>
      {searchResults.loading && <div>Processing input...</div>}
      {searchResults.error && <div>Error: {searchResults.error.message}</div>}
    </p>
    </>
  );
}

export default SearchBar
