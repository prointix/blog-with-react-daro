import React from "react";
import Header from "../components/Header";
import { PostItem } from "../components/PostItem";
import { PostsPublic } from "../components/PostsPublic";


interface HomeProps {}

export const Home: React.FC = () => {
  return (
    <>
      <div className="container">
      <Header />
      <PostsPublic />
      </div>
    </>
  );
};
