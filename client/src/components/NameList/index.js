import React from "react";
import { namesArray } from "../../helpers/names";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useCardId } from "../../hooks/useCard";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { setCardData } = useCardId(1);
  const handleListItemClick = (index) => {
    setCardData(index);
    setSelectedIndex(index);
    // from here, the cardID context will update the
    // characterCard ID which will cause the context children
    // (importantly, the card) to rerender
  };

  return (
    <Box
      sx={{
        width: "35%",
        maxWidth: 360,
        backgroundColor: "white",
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      <List component="nav">
        {!namesArray
          ? null
          : namesArray.map((item, index) => {
              return (
                <ListItemButton
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    backgroundColor: "white",
                  }}
                  key={index}
                  selected={selectedIndex === index + 1}
                  onClick={() => handleListItemClick(namesArray[index][0])}
                >
                  <ListItemText primary={item[1]} />
                </ListItemButton>
              );
            })}
      </List>
    </Box>
  );
}
