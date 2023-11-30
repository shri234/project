import { Box, ListItemButton } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { rules_data } from "./rules";
const rules = [
  {
    id: 1,
    description: `This game aims to help everyone improve their economies.we are created this game
    for the purpose of everyone getting another income from this game.
    `,
    color: "#96202d",
  },
  {
    id: 2,
    description: `This game have 3 spins
    1.Daily Spin
    2.Weekly Spin
    3.Monthly Spin
    This is trusted spin game which is not cheated anyone while spin the game.This spin will be run automatically; this is not controlled by anyone or any other
    person.
    `,
    color: "#838f86",
  },
  {
    id: 3,
    description: `Daily Spin

    This game will need a minimum amount of 100 rupees.
After buying a ticket you can choose 4 digits of the number.
It will spin automatically every 5pm daily.
The first round will be calculated based on what will spined first spin number and
match your ticket first number.
If it is matched you have won the first round prize worth 300 RS then this money is
credited into your wallet. 
`,
    color: "#58426e",
  },
  {
    id: 4,
    description: `Weekly Spin:This weekly spin game will be spin every sunday .this weekly spin game entry
    fees was 300 RS.
     If it is matched you have won the first round prize worth 900 RS then this
    money is credited into your wallet.
     The Second round will be calculated based on what will spined Second spin
    number and match your ticket first number.
     If it is matched you have won the Second  round prize worth 4500 RS then
     this money is credited into your wallet.
     `,
    color: "#427556",
  },
  {
    id: 5,
    description: `Month spin :This month's spin game is different from daily spin game and weekly .This month's
    spin has a different winning price .
    The winning prize should not give every spin.This monthly spin game entry price is
    500.It will have three rounds.each spin having prize amount like first and second and
    third prize amount.
    monthly spin having 3 rounds.`,
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
