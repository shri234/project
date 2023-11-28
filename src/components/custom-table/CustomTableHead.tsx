import { TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { FC } from "react";

export const CustomTableHead: FC<{ table_head: string[] }> = ({
  table_head,
}) => {
  return (
    <TableHead sx={{ background: "#b51271" }}>
      <TableRow>
        {table_head.map((cell) => (
          <TableCell sx={{ color: "#fff", fontWeight: "bold" }} align="center">
            {cell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
