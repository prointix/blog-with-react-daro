import React from "react";
import Header from "../components/Header";
import PostsDraft from "../components/PostsDraft";
import { PostsPublic } from "../components/PostsPublic";

interface HomeProps {}

export const Home: React.FC = () => {
  const [active, setActive] = React.useState("Public Posts");
  return (
    <>
      <nav className="container">
        <button onClick={() => setActive("Public Posts")}>
          {" "}
          Public Posts{" "}
        </button>
        <button onClick={() => setActive("Draft Posts")}> Draft Posts </button>
      </nav>
      <div>{active === "Public Posts" ? <PostsPublic /> : <PostsDraft />}</div>
    </>
  );
};
