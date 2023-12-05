import { Box, ListItemButton } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { rules_data } from "./rules";

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
          fontSize: "2.5rem",
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
          mt: 5,
        }}
      >
        {rules_data.map((rule) => {
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
              <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: "1.5rem",
                  }}
                >
                  {rule.name}
                </span>
                {rule.rules}
              </ListItem>
            </List>
          );
        })}
      </List>
    </Box>
  );
};
export default RulesAndRegulation;
