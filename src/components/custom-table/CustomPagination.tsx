import { Box, Pagination } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

export const CustomPagination: FC<{
  pageCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}> = ({ pageCount, setCurrentPage }) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: { xs: "start", sm: "flex-end" },
        mt: 1,
      }}
    >
      <Pagination
        count={pageCount}
        defaultPage={1}
        siblingCount={0}
        boundaryCount={1}
        onChange={(e, page) => {
          setCurrentPage(page - 1);
        }}
      />
    </Box>
  );
};
