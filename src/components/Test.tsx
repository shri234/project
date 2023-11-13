import Box from "@mui/material/Box";
import React, { useState, useRef } from "react";
import "./Test.css";
const SpinnerWheel: React.FC = () => {

  
  const spinWheel = () => {
    
    
     
    
  };

  const numberStyle = (i: number, clr: string): React.CSSProperties =>
    ({
      "--i": i.toString(),
      "--clr": clr,
    } as React.CSSProperties);

  const numbers = [
    { i: 1, clr: "#8932a8" },
    { i: 2, clr: "#8a1a6e" },
    { i: 3, clr: "#960b35" },
    { i: 4, clr: "#0c486e" },
    { i: 5, clr: "#155932" },
    { i: 6, clr: "#567010" },
    { i: 7, clr: "#8a5107" },
    { i: 8, clr: "#186307" },
    { i: 9, clr: "#070c63" },
    { i: 10, clr: "#a10e20" },
  ];

  return (
    <div className="body-spin">
      <Box component={"div"} className="container">
        <Box component={"div"} className="spinBtn" ></Box>
        <Box component="div" className="wheel" >
          {numbers.map((num) => (
            <Box
              key={num.i}
              component="div"
              className="number"
              style={numberStyle(num.i, num.clr)}
            >
              <span>{num.i - 1}</span>
            </Box>
          ))}
        </Box>
      </Box>
      <script>
      let wheelRef =document.querySelector(".wheel")
      let spinbtn=document.querySelectore
      spinBtn.oncl

      let value = Math.ceil(Math.random() * 3600);
    console.log(wheelRef)

      wheelRef.style.transform = "rotate("+ value + "deg)";
      value +=Math.ceil(Math.random() * 3600)
      </script>
    </div>
  );
};

export default SpinnerWheel;
