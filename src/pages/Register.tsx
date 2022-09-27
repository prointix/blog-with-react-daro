import { Link } from "react-router-dom";
import { useState } from "react";

import "../assets/styles/SignIn.css";
import { IRegister } from "../types";
import axios from "axios";

function Register() {
  const [credentials, setCredentials] = useState<IRegister>({} as IRegister);

  const handleChange = (e: any) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  async function handleClick(e: any) {
    try {
      const { data } = await axios.post<IRegister>(
        "https://blogserver.fly.dev/auth/register",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registration successful");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
        return error.message;
      } else {
        return "An unexpected error occurred";
      }
    }
  }

  return (
    <div className="sign-in">
      <div className="logo">WeChii</div>
      <div className="header">
        <div className="text-container">
          <p>
            <span id="header">Sign in to </span>
            <br /> Lorem Ipsum is simply
          </p>
          <span>
            Lorem Ipsum is simply dummy text of the printing and <br />{" "}
            typesetting industry. Lorem Ipsum has been the industry's <br />{" "}
            standard dummy text ever since the 1500s,
          </span>
        </div>
        <div className="seperator"></div>
        <div className="login-container">
          <div className="login-elements">
            <div className="login-header-text">
              <p>
                Welcome to <span>WeChii</span>
              </p>
              <span>
                Have an Account?{" "}
                <a href="#">
                  <Link to={"/signin"}>
                    <p>Sign in</p>
                  </Link>
                </a>
              </span>
            </div>
            <div className="login-signin">Sign Up</div>
            <div className="login-input">
              <label htmlFor="" className="input">
                name
              </label>
              <br />
              <input
                onChange={handleChange}
                type="text"
                placeholder="  name"
                id="name"
              />
              <br />
              <div className="user-name-tel">
                <div className="on-top">
                  <label htmlFor="" className="input">
                    email
                  </label>
                  <br />
                  <br />
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder="  email"
                    id="email"
                  />
                  <br />
                  <br />
                </div>
              </div>
              <label htmlFor="" className="input">
                Enter your password
              </label>
              <br />
              <input
                onChange={handleChange}
                type="password"
                placeholder="   password"
                id="password"
              />
              <br />
              <br />
              <button onClick={handleClick} className="submit-btn">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
