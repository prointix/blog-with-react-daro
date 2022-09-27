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
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    } else {
      return;
    }
  };

  const createPost = async () => {
    navigate("/new");
  };

  return (
    <>
      <Header />
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
        <button onClick={createPost}>Create Post</button>
      </nav>
      <div>{active === "Public Posts" ? <PostsPublic /> : <PostsDraft />}</div>
    </>
  );
};
