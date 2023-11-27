import "./App.css";
import LoginComponent from "./components/Login/Login";
import LandingPage from "./components/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpComponent from "./components/sign-up/SignUp";
import Login from "./components/login-user/LoginUser";
import UserTicketBuy from "./components/ticket/UserTicketBuy";
import TimelineSpin from "./components/timeline-spin/TimelineSpin";
import AdminHome from "./components/admin/home";
import Result from "./components/admin/Result";
import MasterHome from "./components/master/Home";
import UserDetail from "./components/master/UserDetail";
import PlayHistory from "./components/master/PlayHistory";
import RedeemHistory from "./components/master/RedeemHistory";
import PaymentRequest from "./components/master/PaymentRequest";
import SpinWheel from "./components/master/SpinWheel";
import UserProfile from "./components/agent/UserProfile";
import BuyTicket from "./components/BuyTicket/BuyTicket";
import AgentProfile from "./components/agent/Profile";
import Profile from "./components/user/UserProfile";
import BackOfficeHome from "./components/BackOffice/Home";
import BackOfficePlayHistory from "./components/BackOffice/PlayHistory";
import BackOfficePaymentRequest from "./components/BackOffice/PaymentRequest";
import BackOfficeRedeemHistory from "./components/BackOffice/RedeemHistory";
import BackOfficeUserDetail from "./components/BackOffice/UserDetail";
import AgentPlayHistory from "./components/agent/PlayHistory";
import MasterResult from "./components/master/Result";
import AgentCreation from "./components/BackOffice/AgentCreation";
import { Box } from "@mui/material";
import AgentHome from "./components/agent/Home";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-page" element={<LoginComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpComponent />} />
          <Route path="/spin" element={<TimelineSpin />} />
          <Route
            path="/daily"
            element={
              <UserTicketBuy name="Daily Spin" path="/daily-buy-ticket" />
            }
          />
          <Route
            path="/weekly"
            element={
              <UserTicketBuy name="Weekly Spin" path="/weekly-buy-ticket" />
            }
          />
          <Route
            path="/monthly"
            element={
              <UserTicketBuy name="Monthly Spin" path="/monthly-buy-ticket" />
            }
          />
          <Route
            path="/daily-buy-ticket"
            element={<BuyTicket name="Daily Spin" path="/daily" />}
          />
          <Route
            path="/monthly-buy-ticket"
            element={<BuyTicket name="Monthly Spin" path="/monthly" />}
          />{" "}
          <Route
            path="/weekly-buy-ticket"
            element={<BuyTicket name="Weekly Spin" path="/weekly" />}
          />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/master" element={<MasterHome />} />
          <Route path="/user-details" element={<UserDetail />} />
          <Route path="/play-history" element={<PlayHistory />} />
          <Route path="/wallet-history" element={<RedeemHistory />} />
          <Route path="/payment-request" element={<PaymentRequest />} />
          <Route
            path="/back-office-user-details"
            element={<BackOfficeUserDetail />}
          />
          <Route
            path="/back-office-play-history"
            element={<BackOfficePlayHistory />}
          />
          <Route
            path="/back-office-wallet-history"
            element={<BackOfficeRedeemHistory />}
          />
          <Route
            path="/back-office-payment-request"
            element={<BackOfficePaymentRequest />}
          />
          <Route path="/spin-wheel" element={<SpinWheel />} />
          <Route path="/agent" element={<AgentHome />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/agent-profile" element={<AgentProfile />} />
          <Route path="/agent-play-history" element={<AgentPlayHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-result" element={<Result title="Daily" />} />
          <Route path="/weekly-result" element={<Result title="Weekly" />} />
          <Route path="/monthly-result" element={<Result title="Monthly" />} />
          <Route
            path="/master-daily-result"
            element={<MasterResult title="Daily" />}
          />
          <Route
            path="/master-weekly-result"
            element={<MasterResult title="Weekly" />}
          />
          <Route
            path="/master-monthly-result"
            element={<MasterResult title="Monthly" />}
          />
          <Route path="/back-office" element={<BackOfficeHome />} />
          <Route path="/agent-sign-up" element={<AgentCreation />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
