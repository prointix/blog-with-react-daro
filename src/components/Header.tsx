import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/Home.css";
import { useAuth } from "../contexts/auth";

export const Header: React.FC = () => {
  const { signed, user, logout } = useAuth();

  const logoutHandler = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <>
      <header>
        <div className="nav container">
          <a href="" className="logo">
            ve<span>nom</span>
          </a>
          {signed ? (
            <a onClick={logoutHandler} className="login">
              Logout
            </a>
          ) : (
            <Link to="/signin" className="login">
              Login
            </Link>
          )}
        </div>
      </header>

      <section className="home" id="home">
        <div className="home-context container">
          <h2 className="home-title-box">The TS Blog</h2>
          {signed === true ? (
            <span className="home-subtitle-box">
              Welcome Back Mr. {user?.name}
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
