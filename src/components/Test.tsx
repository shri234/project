import Box from "@mui/material/Box";
import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import "./Test.css";

const spinnerMap = new Map<number, number>();

const valuesForKeys = [38, 80, 120, 150, 190, 225, 260, 300, 335, 10];

for (let i = 9; i >= 0; i--) {
  spinnerMap.set(i, valuesForKeys[9 - i]);
}
const SpinnerWheel: React.FC<{
  value: number | null;
  setTmpSpinner: Dispatch<SetStateAction<number | null>>;
}> = ({ value, setTmpSpinner }) => {
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = async (digit: number) => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${7200 + digit}deg)`;
      setTmpSpinner(null);
    }
  };

  const ifZerospinWheel = async () => {
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${7200 + 10}deg)`;
    }
  };

  useEffect(() => {
    if (value === 0) {
      ifZerospinWheel();
    }
    {
      if (value !== null) {
        const tmp = spinnerMap.get(value);

        if (tmp !== undefined) {
          spinWheel(tmp + 7200);
        }
      }
    }
  }, [value]);

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
        {/* onClick={spinWheel} */}
        <Box component={"div"} className="spinBtn"></Box>
        <Box component="div" className="wheel" ref={wheelRef}>
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
    </div>
  );
};

export default SpinnerWheel;
