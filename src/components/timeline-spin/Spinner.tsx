import Box from "@mui/material/Box";
import { FC } from "react";

export const SpinnerComponent: FC<{ value: any }> = ({ value }) => {
  const handleLoginType = () => {
    window.location.href = `/${value.name.toLowerCase()}`;
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          background: "#093375",
          backgroundImage: `url('/spinner_background.svg')`,
          p: 4,
          width: { xs: "80px", sm: "130px", lg: "160px" },
          height: { xs: "80px", sm: "130px", lg: "160px" },
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#0B437C",
            p: 4,
            width: "10px",
            height: "10px",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          component={"div"}
          onClick={() => handleLoginType()}
        >
          <Box
            component={"div"}
            sx={{
              color: "#fff",
              fontWeight: "700",
              p: 1,
              borderRadius: "5px",
            }}
          >
            {value.name}
          </Box>
        </Box>
      </Box>
      <Box component={"div"} sx={{ color: "#cc0e90", fontWeight: "700" }}>
        "{value.price_amount}"
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        {value.instruction.map((instruction: any) => {
          return (
            <Box
              component={"div"}
              key={instruction.id}
              sx={{ display: "flex", gap: "4px" }}
            >
              <Box>
                <img src="/diamond.svg" alt="diamond" />
              </Box>
              <Box
                component={"div"}
                sx={{ color: "#F5F5F5", fontWeight: "650" }}
              >
                {instruction.description}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
