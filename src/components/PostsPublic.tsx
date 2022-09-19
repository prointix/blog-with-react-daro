import React from "react";
import { Key, useEffect, useState } from "react";
import "../assets/styles/Home.css";
import {  IArticle, IArticleResponse } from "../types";
import api from "../utils/api";

// interface PostsPublicProps{
//     title: string;
//     description: string;
//     body: string;
//     featuredAsset: String
// }

export const PostsPublic: React.FC =() => {
  const [item, setItem] = useState<IArticle>({} as IArticle);

  const fetchData = async () => {
    const result = await api.get<IArticle>("/articles");
    setItem(result.data);
    console.log(item)
  };

  useEffect( () => {
    fetchData();
  }, []);

  //display the data
  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="posts">
        <div className="post">
          {item.body}
        </div>
      </div>
    </div>
  );

}



