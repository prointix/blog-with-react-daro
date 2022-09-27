import React from "react";

import "../assets/styles/Home.css";
import { useAuth } from "../contexts/auth";

interface HeaderProps {}

export const Header: React.FC = () => {
  return (
    <>
      <header className="home-header">
        <h2>Euro Khmer Voyages</h2>
        <h1>
          <span>Welcome back </span> Blog <span></span>
        </h1>
        <p>
          awesome place to make oneself <br /> productive and entertained
          through daily updates.
        </p>
      </header>
      <div className="searchBar-wrap">
        <form>
          <input type="text" placeholder="Search By Category" />
          <button>Go</button>
        </form>
      </div>
    </>
  );
};

export default Header;
