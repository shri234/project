import { Box } from "@mui/material";

const CopyRight = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },

        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: { xs: "center", sm: "space-between" },

        gap: 2,
        width: "100%",
      }}
    >
      <Box
        component={"div"}
        sx={{
          color: "#fff",
          display: "flex",
          whiteSpace: "nowrap",
          fontWeight: "bold",
          pl: 2,
        }}
      >
        <Box>Copyright:</Box>
        <Box>Money Minning Spin Game</Box>
      </Box>
      <Box
        component={"div"}
        sx={{ display: "flex", alignItems: "center", gap: 2, pr: 2 }}
      >
        <Box>
          <img
            src="/fb.svg"
            alt="fb"
            style={{ background: "#fff", padding: "5px" }}
          />
        </Box>
        <Box>
          <img
            src="/linkedin.svg"
            alt="fb"
            width={20}
            style={{ background: "#fff", padding: "5px" }}
          />
        </Box>
        <Box>
          <img
            src="/twitter.svg"
            alt="fb"
            width={20}
            height={20}
            style={{ background: "#fff", padding: "5px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default CopyRight;
