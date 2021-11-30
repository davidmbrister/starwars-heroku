import { Box } from "@mui/system";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import NameList from "./components/NameList";
import SearchBar from "./components/SearchBar";
import { useCardId } from "./hooks/useCard";
import backgroundImg from "./img/starwars.jpg";

const LayoutStyling = {
  width: "1440px",
  background: `url(${backgroundImg})`,
  border: "none",
  padding: "0.5rem",
  margin: "auto",
  fontFamily: 'Share Tech Mono, monospace'
};

function App() {
  const { getCardData } = useCardId();
  const characterID = getCardData() ?? 1;
  const headerStyles = {
    width: "1440px",
    color: "white",
    textAlign: "center",
    marginBottom: "4rem",
    fontFamily: "Audiowide, cursive",
    fontSize: 50,
  };
  return (
    <div style={LayoutStyling}>
      <h1 style={headerStyles}>Star Wars Character Explorer</h1>
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "background.paper",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 4,
          fontWeight: "bold",
        }}
      >
        <NameList />
        <CharacterCard characterId={characterID ?? 1} />
      </Box>
    </div>
  );
}

export default App;
