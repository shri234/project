import { Box, ListItemButton } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
const rules = [
  {
    id: 1,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum error
    reiciendis id corrupti quo dolorem minus molestias delectus, sequi at
    ducimus soluta facere, quas sunt fuga! At esse deleniti animi.`,
    color: "#96202d",
  },
  {
    id: 2,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum error
    reiciendis id corrupti quo dolorem minus molestias delectus, sequi at
    ducimus soluta facere, quas sunt fuga! At esse deleniti animi.`,
    color: "#838f86",
  },
  {
    id: 3,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum error
    reiciendis id corrupti quo dolorem minus molestias delectus, sequi at
    ducimus soluta facere, quas sunt fuga! At esse deleniti animi.`,
    color: "#58426e",
  },
  {
    id: 4,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum error
    reiciendis id corrupti quo dolorem minus molestias delectus, sequi at
    ducimus soluta facere, quas sunt fuga! At esse deleniti animi.`,
    color: "#427556",
  },
  {
    id: 5,
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum error
    reiciendis id corrupti quo dolorem minus molestias delectus, sequi at
    ducimus soluta facere, quas sunt fuga! At esse deleniti animi.`,
    color: "#83914a",
  },
];
const RulesAndRegulation = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#fff",
          fontSize: "1.2rem",
        }}
      >
        Rules and Regulation
      </Box>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {rules.map((rule) => {
          return (
            <List
              key={rule.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: rule.color,
                maxWidth: "md",
                fontWeight: "600",
                borderRadius: "10px",
                boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px`,
              }}
            >
              <ListItemButton
                sx={{
                  fontSize: "1rem",
                  background: "#9fc1d1",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  ml: 1,
                }}
              >
                {rule.id}
              </ListItemButton>
              <ListItem>{rule.description}</ListItem>
            </List>
          );
        })}
      </List>
    </Box>
  );
};
export default RulesAndRegulation;
