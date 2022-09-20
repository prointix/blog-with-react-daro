import React from "react";
import Header from "../components/Header";
import PostsDraft from "../components/PostsDraft";
import { PostsPublic } from "../components/PostsPublic";

interface HomeProps {}

export const Home: React.FC = () => {
  return (
    <>
      <div className="container">
        <PostsDraft />
      </div>
    </>
  );
};
