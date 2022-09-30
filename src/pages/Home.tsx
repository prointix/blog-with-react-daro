import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PostsDraft from "../components/PostsDraft";
import { PostsPublic } from "../components/PostsPublic";

interface HomeProps {}

export const Home: React.FC = () => {
  const [active, setActive] = React.useState("Public Posts");
  const navigate = useNavigate();

  const createPost = async () => {
    navigate("/new");
  };

  return (
    <>
      <Header />
      <div className="post-filter container">
        <span
          onClick={() => setActive("Public Posts")}
          className={
            active === "Public Posts" ? "active-filter" : "filter-item"
          }
          data-filter="Public Posts"
        >
          Public Posts
        </span>
        <span
          onClick={() => setActive("Draft Posts")}
          className={active === "Draft Posts" ? "active-filter" : "filter-item"}
          data-filter="Draft Posts"
        >
          Draft Posts
        </span>
        <button onClick={createPost} className="button-new">
          Create Post
        </button>
      </div>

      <div>{active === "Public Posts" ? <PostsPublic /> : <PostsDraft />}</div>
    </>
  );
};
