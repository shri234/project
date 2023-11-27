import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "./TimelineSpin.css";

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function PayInModal({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userid = sessionStorage.getItem("userId");
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (res) => {
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
        }
      }
    );
  }, []);
  const fetchData = async () => {
    const walletAmount = sessionStorage.getItem("amount");
    try {
      const body = {
        amount: walletAmount,
        userId: userid,
        username: sessionStorage.getItem("username"),
      };
      console.log(body);
      let date = new Date();
      let datee = moment(date).format("YYYY-MM-DD");
      console.log(datee);
      const response = await axios.post(
        `${process.env.REACT_APP_IP}/ticket/addWallet`,
        body
      );

      if (response.status == 200) {
        window.location.href = "/daily";
      }
    } catch (err) {}
  };
  const initiatePayment = async () => {
    try {
      const orderUrl = `${process.env.REACT_APP_IP}/payment/paymentIntegration`;

      const result = await axios.post(orderUrl, { amount: amount * 100 });
      console.log(result.data);
      if (result.data.status === "created") setOpen(false);

      const options = {
        key: "rzp_test_LrYDgHpueIsSO0",
        amount: result.data.amount,
        currency: result.data.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: result.data.id,
        handler: handleVerification,
        prefill: {
          name: "Customer Name",
          email: "customer_email@example.com",
          contact: "customer_contact_number",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      const walletAmount = sessionStorage.getItem("amount");
      try {
        const body = {
          amount: walletAmount,
          userId: userid,
          username: sessionStorage.getItem("username"),
        };
        console.log(body);
        let date = new Date();
        let datee = moment(date).format("YYYY-MM-DD");
        const response = await axios.post(
          `${process.env.REACT_APP_IP}/ticket/addWallet`,
          body
        );
        if (response.status == 200) {
          // window.location.href = "/daily";
        }
      } catch (err) {}
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  async function handleVerification(response: any) {
    const verifyUrl = `${process.env.REACT_APP_IP}/payment/paymentverify`;
    try {
      const verifyResult = await axios.post(verifyUrl, {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
      });

      if (verifyResult.data.valid) {
      } else {
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
    }
  }
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
            <img src="/qr.jpeg" className="payment-qr" />
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
              <img src="/star.svg" height={20} width={20} />{" "}
            </Box>
            <Box
              component={"div"}
              sx={{ textAlign: "justify", fontWeight: "600" }}
            >
              Please send the payment screenshot with your username & mail on
              these number <span style={{ color: "blue" }}>9025134872</span>
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
              <img src="/star.svg" height={20} width={20} />{" "}
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
