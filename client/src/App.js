import { Box } from '@mui/system';
import './App.css';
import CharacterCard from './components/CharacterCard';
import NameList from './components/NameList';
import SearchBar from "./components/SearchBar";
import  {useCardId}  from './hooks/useCard';


const LayoutStyling = {width:"740px",background:"aliceblue", border:"none", padding:"0.5rem", marginLeft: "auto"};

function App() {
 const {getCardData} = useCardId()
 const characterID =  getCardData() ?? 1
  return (
    
      <div style = {LayoutStyling}>
      <SearchBar />
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'top',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'bold',
      }}>
          <NameList />
          <CharacterCard characterId={characterID ?? 1} />
        </Box>
      </div>
    

  );
}

export default App;
