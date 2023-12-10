import { Box } from "@mui/material";
import { FC } from "react";

export const CountDown: FC<{
  timeLeft: {
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}> = ({ timeLeft }) => {
  return (
    <Box
      component={"div"}
      className="count-down"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "none",
        borderRadius: "5px",
        p: { xs: "4px", sm: 2 },
      }}
    >
      <Box
        component={"div"}
        sx={{ fontWeight: 700, color: "#fff", fontSize: "1.25rem" }}
      >
        Count Down:
      </Box>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "1.25rem",
          color: "#d1dae8",
        }}
      >
        {timeLeft.day.length > 1 && (
          <Box
            component={"div"}
            sx={{
              background: "#074fad",
              height: "fit-content",
              p: 1,
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "20px",
              color: "#fff",
            }}
          >
            {timeLeft.day}
          </Box>
        )}
        {timeLeft.day.length > 0 && <span>:</span>}
        <Box
          component={"div"}
          sx={{
            background: "#074fad",
            height: "fit-content",
            p: 1,
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          {timeLeft.hours}
        </Box>
        :
        <Box
          component={"div"}
          sx={{
            background: "#074fad",
            height: "fit-content",
            p: 1,
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          {timeLeft.minutes}
        </Box>
        :
        <Box
          component={"div"}
          sx={{
            background: "#074fad",
            height: "fit-content",
            p: 1,
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          {timeLeft.seconds}
        </Box>
      </Box>
    </Box>
  );
};
