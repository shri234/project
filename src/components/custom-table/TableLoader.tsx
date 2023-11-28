import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const TableLoader: FC<{
  colSpan: number;
}> = ({ colSpan }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell
        align="center"
        colSpan={colSpan}
        sx={{
          fontWeight: "800",
          fontSize: "1.15rem",
          color: "blue",
        }}
      >
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};
