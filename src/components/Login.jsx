import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";

export default function Login() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const sendData = {
      email: email + "@gmail.com",
      password,
    };
    console.log("send: ", sendData);

    try {
      const response = await fetch(`${backendURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error(response.text);
      }

      const receivedData = await response.json();

      localStorage.setItem("authToken", receivedData.token);

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col gap-8 items-center justify-center"
      style={{ backgroundImage: `url('/mainbg.png')` }}
    >
      <form
        className="w-10/12 sm:w-8/12 md:w-5/12 lg:w-4/12 h-auto bg-white flex flex-col items-center py-4 form-shadow gap-4"
        onSubmit={handleLogin}
      >
        <h1 className="font-righteous text-xl font-semibold">
          Start your cooking spree...
        </h1>

        <OutlinedInput
          required
          className="w-9/12 h-10"
          placeholder="Email"
          endAdornment={
            <InputAdornment position="end">@gmail.com</InputAdornment>
          }
          onChange={handleEmailChange}
        />

        <OutlinedInput
          onChange={handlePasswordChange}
          required
          className="w-9/12 h-10"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <button className=" w-6/12 h-10 mt-10 text-white rounded-sm bg-[#2eb800] font-semibold text-lg rounded-tl-md rounded-br-md">
          Login
        </button>
        <span className=" text-xs font-medium mt-4">
          First time here?{" "}
          <Link to="/register" className=" text-blue-600 underline">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
