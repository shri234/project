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
  tmp_spinner: null | number;
  setTmpSpinner: Dispatch<SetStateAction<null | number>>;
}> = ({ tmp_spinner, setTmpSpinner }) => {
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = async (digit: number) => {
    if (wheelRef.current) {
      setTmpSpinner(null);
      wheelRef.current.style.transform = `rotate(${digit}deg)`;
    }
  };

  const ifZerospinWheel = async () => {
    if (wheelRef.current) {
      setTmpSpinner(null);
      wheelRef.current.style.transform = `rotate(${7200 + 10}deg)`;
    }
  };

  useEffect(() => {
    if (tmp_spinner === 0) {
      ifZerospinWheel();
    }
    {
      if (tmp_spinner !== null) {
        let tmp = spinnerMap.get(tmp_spinner);

        if (tmp !== undefined) {
          spinWheel(tmp + 7200);
          tmp = undefined;
        }
      }
    }
  }, [tmp_spinner, setTmpSpinner]);

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
        <Box component={"div"} className="spinBtn"></Box>
        <Box component="div" className="wheel" ref={wheelRef}>
          {numbers.map((num, index) => (
            <Box
              key={`${num.i}+ ${index}`}
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
