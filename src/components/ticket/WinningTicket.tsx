import { Box } from "@mui/material";
import { FC,useEffect,useState } from "react";
import { WinningTicketInterface } from "./UserTicketBuy";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
interface EventData {
  result_ticket:string
}
export const WinningTicket: FC<{ winning_ticket: WinningTicketInterface }> = ({
  winning_ticket,
}) => {
  const [result, setResult] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      // const response = await axios.get(
      //   `${
      //     process.env.REACT_APP_IP
      //   }/ticket/getWallet?userId=${sessionStorage.getItem("userId")}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    
      const eventSource = new EventSource(`${
        process.env.REACT_APP_IP
      }/ticket/sse1`)

      eventSource.onmessage = (event) => {
        try{
        const eventData: EventData = JSON.parse(event.data);
        if(eventData){
          console.log(eventData.result_ticket, typeof eventData.result_ticket,eventData);
        setResult(eventData.result_ticket.split("")) 
        } 
        else{
          console.log("inside");
        }
      }
      catch(err){
        console.log(err)
      }
      };
  
      // Handle SSE errors
      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };
  
      // if (setWalletAmount) setWalletAmount(response.data.data.amount);
      // setBalance(response.data.data.amount);

       // Cleanup SSE connection on component unmount
      return () => {
        eventSource.close();
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchData()
        },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP}/ticket/result`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data)
        const tmp: [] = response.data.data.result_ticket.split("").map(Number);
        console.log(tmp)
        setResult(tmp);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // else {
    //   setResult([]);
    // }
   
  }, []);

  return (
    <Box
      className="result"
      component={"div"}
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
        borderRadius: "6px",
        border: "none",
        p: { xs: "4px", sm: 2 },
      }}
    >
      <Box
        component={"div"}
        sx={{ fontWeight: "700", color: "#fff", fontSize: "1.25rem" }}
      >
        Result:
      </Box>

      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
        }}
      >
        <ResultTicketDigit value={result[0]} />
        <ResultTicketDigit value={result[1]} />
        <ResultTicketDigit value={result[2]} />
        <ResultTicketDigit value={result[3]} />
      </Box>
    </Box>
  );
};

const ResultTicketDigit: FC<{ value: null | string }> = ({ value }) => {
  return value !== null ? (
    <Box
      component={"div"}
      sx={{
        width: "25px",
        height: "25px",
        border: "none",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1.15rem",
        borderRadius: "5px",
        background: "#84bd13",
        p: 0.5,
      }}
    >
      {value}
    </Box>
  ) : (
    <Box
      component={"div"}
      sx={{
        width: "25px",
        height: "25px",
        border: "none",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1.15rem",
        borderRadius: "5px",
        background: "#84bd13",
        p: 0.5,
      }}
    >
      <CurrencyRupeeIcon />
    </Box>
  );
};
