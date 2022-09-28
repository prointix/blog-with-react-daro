import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/Home.css";
import { useAuth } from "../contexts/auth";
import { IAuthResponse, IUser } from "../types";

interface HeaderProps {}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IAuthResponse | null>({
    user: {
      createdAt: "",
      email: "",
      id: 0,
      name: "",
      updatedAt: "",
    },
    accessToken: "",
  });
  const { state, dispatch } = useAuth();
  const loginNavigate = (e: any) => {
    e.preventDefault();
    navigate("/signin");
  };

  console.log(state.signed);

  const logoutHandler = (e: any) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      state.signed = false;
      dispatch({ type: "LOGOUT" });
    } else {
      return;
    }
  };

  return (
    <>
      <header>
        <div className="nav container">
          <a href="" className="logo">
            ve<span>nom</span>
          </a>
          {state.signed === true ? (
            <a onClick={logoutHandler} className="login">
              Logout
            </a>
          ) : (
            <a onClick={loginNavigate} className="login">
              Login
            </a>
          )}
        </div>
      </header>

      <section className="home" id="home">
        <div className="home-context container">
          <h2 className="home-title-box">The TS Blog</h2>
          {state.signed === true ? (
            <span className="home-subtitle-box">
              Welcome Back Mr. {state.user?.name}
            </span>
          ) : (
            <span className="home-subtitle-box">Post your blog with us</span>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
