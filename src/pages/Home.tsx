import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostsDraft from "../components/PostsDraft";
import { PostsPublic } from "../components/PostsPublic";
import { useAuth } from "../contexts/auth";

interface HomeProps {}

export const Home: React.FC = () => {
  const { state, dispatch } = useAuth();
  const [active, setActive] = React.useState("Public Posts");
  const navigate = useNavigate();

  const loginNavigate = (e: any) => {
    e.preventDefault();
    navigate("/signin");
  };

  const logoutHandler = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <nav className="container">
        <button onClick={() => setActive("Public Posts")}>
          {" "}
          Public Posts{" "}
        </button>
        <button onClick={() => setActive("Draft Posts")}> Draft Posts </button>
        {state.signed ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <button onClick={loginNavigate}>Login</button>
        )}
      </nav>
      <div>{active === "Public Posts" ? <PostsPublic /> : <PostsDraft />}</div>
    </>
  );
};
