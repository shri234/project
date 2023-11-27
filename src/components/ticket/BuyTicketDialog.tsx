import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { DialogTitle } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function BuyTicketWarningDlg({
  setBuyTicketWarningDlg,
}: {
  setBuyTicketWarningDlg: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Modal
        open={true}
        onClose={() => setBuyTicketWarningDlg(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"div"} style={{ color: "red" }}>
          Cannot Buy a Ticket between 5pm to 6pm.
        </Box>
      </Modal>
    </div>
  );
}
