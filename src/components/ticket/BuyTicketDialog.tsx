import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
  description,
}: {
  setBuyTicketWarningDlg: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
}) {
  return (
    <div>
      <Modal
        open={true}
        onClose={() => setBuyTicketWarningDlg(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component={"div"}
          style={{ color: "red", fontSize: "1.25rem", fontWeight: "bold" }}
        >
          {description}
        </Box>
      </Modal>
    </div>
  );
}
