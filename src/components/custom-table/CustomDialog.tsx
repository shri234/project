import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const CustomizedStatusDialogs: React.FC<{
  description: string;
  status: string;
  setOpenStatusDlg: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ description, setOpenStatusDlg, status }) => {
  const handleClose = () => {
    setOpenStatusDlg(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        sx={{ zIndex: 2000 }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogContent dividers>
          <Typography
            gutterBottom
            style={
              status === "success"
                ? {
                    color: "green",
                  }
                : status === "error"
                ? { color: "red" }
                : status === "warning"
                ? { color: "#c2b574" }
                : { color: "blue" }
            }
            sx={{ mt: 2, px: 4, fontWeight: "bold" }}
          >
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

/* <IconButton
aria-label="close"
onClick={handleClose}
sx={{
  position: "absolute",
  right: 8,
  top: 8,
  color: (theme) => theme.palette.grey[500],
}}
>
<CloseIcon />
</IconButton> */
