import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SignUpComponent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [refer_id, setReferralId] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    refer_id: "",
  });

  const emailRegex = /\S+@\S+\.\S+/;
  const userNameRegex = /^[a-z]+$/;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setFormErrors({
      ...formErrors,
      email: emailRegex.test(newEmail)
        ? ""
        : "Please enter a valid email address.",
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setFormErrors({
      ...formErrors,
      password:
        newPassword.length >= 8
          ? ""
          : "Password must be at least 8 characters long.",
    });
  };
  const handleMobileNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMobile = event.target.value;
    setMobile(newMobile);
    setFormErrors({
      ...formErrors,
      mobile: mobile ? "" : "Please enter Mobile number",
    });
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value;
    console.log(userNameRegex.test(newUserName), "Username");
    setName(newUserName);
    setFormErrors({
      ...formErrors,
      name: !userNameRegex.test(newUserName)
        ? "username must contains a-z characters"
        : newUserName.length >= 6
        ? ""
        : "Username must be at least 6 characters long.",
    });
  };

  const handleSignUp = async () => {
    const newErrors = {
      ...formErrors,
      name: name ? "" : "Name is required.",
      mobile: mobile ? "" : "Mobile number is required.",
      email: email
        ? emailRegex.test(email)
          ? ""
          : "Please enter a valid email address."
        : "Email is required.",
      password: password
        ? password.length >= 8
          ? ""
          : "Password must be at least 8 characters long."
        : "Password is required.",
    };
    setFormErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    if (mobile.length !== 10) {
      setFormErrors({
        ...formErrors,
        mobile: mobile.length === 10 ? "" : "Mobile number must be 10 digits",
      });

      return;
    }
    const body = {
      username: name,
      mobileNumber: mobile,
      email: email,
      password: password,
      referralId: refer_id,
      role: sessionStorage.getItem("Role")?.toLocaleLowerCase(),
    };

    try {
      const response = await axios
        .post("http://localhost:3002/user/signup", body)
        .then(() => {
          window.location.href = "/";
        });
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="input-container">
        <label className="label-color">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleUserNameChange}
          className={formErrors.name ? "invalid" : ""}
          placeholder="Enter your name"
        />
        {formErrors.name && <p className="error">{formErrors.name}</p>}
      </div>
      <div className="input-container">
        <label className="label-color">Mobile Number</label>
        <input
          type="tel"
          value={mobile}
          onChange={handleMobileNoChange}
          className={formErrors.mobile ? "invalid" : ""}
          placeholder="Enter your mobile number"
        />
        {formErrors.mobile && <p className="error">{formErrors.mobile}</p>}
      </div>
      <div className="input-container">
        <label className="label-color">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={formErrors.email ? "invalid" : ""}
          placeholder="Enter your email"
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
      </div>
      <div className="input-container password-input-container">
        <label className="label-color">Password</label>

        <input
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          className={formErrors.password ? "invalid" : ""}
          placeholder="Enter your password"
        />

        <span
          className={
            formErrors.password
              ? "password-toggle-error-icon"
              : "password-toggle-icon"
          }
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </div>
      <div className="input-container">
        <label className="label-color">Referral ID</label>
        <input
          type="text"
          value={refer_id} 
          onChange={(e) => setReferralId(e.target.value)}
          className={formErrors.refer_id ? "invalid" : ""}
          placeholder="Enter your referral ID"
        />
        {formErrors.refer_id && <p className="error">{formErrors.refer_id}</p>}
      </div>
      <button className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUpComponent;