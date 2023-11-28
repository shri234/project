import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";

export const NoDataFoundTable: FC<{
  colSpan: number;
  description: string;
}> = ({ colSpan, description }) => {
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
        {description}
      </TableCell>
    </TableRow>
  );
};
