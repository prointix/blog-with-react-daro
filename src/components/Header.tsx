import React from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/Home.css";
import { useAuth } from "../contexts/auth";

interface HeaderProps {}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const loginNavigate = (e: any) => {
    e.preventDefault();
    navigate("/signin");
  };

  const logoutHandler = (e: any) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
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
          {state.signed ? (
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
          <h2 className="home-title">The TS Blog</h2>
          <span className="home-subtitle">Your source of great content</span>
        </div>
      </section>
    </>
  );
};

export default Header;
