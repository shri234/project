import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./TimelineSpin.css";

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

export default function PayInModal({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Modal
        open={true}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              color: "#092b61",
              fontWeight: "bold",
              my: 1,
              fontSize: "18px",
            }}
          >
            Deposit
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <img src="/qr.jpeg" className="payment-qr" alt="payment-qr" /> */}
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              gap: "4px",
            }}
          >
            <Box>
              <img src="/star.svg" alt="star" height={20} width={20} />
            </Box>
            <Box
              component={"div"}
              sx={{ textAlign: "justify", fontWeight: "600" }}
            >
              Please send the payment screenshot with your username & mail on
              these number <span style={{ color: "blue" }}>9025134872</span>
              kindly contact near by agent
            </Box>
          </Box>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              gap: "4px",
            }}
          >
            <Box>
              <img src="/star.svg" alt="star" height={20} width={20} />
            </Box>

            <Box sx={{ textAlign: "justify", fontWeight: "600" }}>
              Any queries text me at whatsapp on the above number
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
