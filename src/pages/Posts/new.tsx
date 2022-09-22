import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { IArticle, IUser } from "../../types";
import api from "../../utils/api";

function NewPost() {
  const [article, setArticle] = useState<IArticle>({} as IArticle);

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
    console.log(e.target.id);
  };
  const [user, setUser] = useState<IUser | null>(null);

  const handlePost = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/articles", article, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Post created successfully");
      return data;
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <form action="">
        <input
          onChange={handleChange}
          type="text"
          placeholder="title"
          required
          id="title"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="description"
          id="description"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="body"
          id="body"
          required
        />
        <input
          onChange={handleChange}
          type="file"
          placeholder="image"
          id="featuredAsset"
        />
        <button onClick={handlePost}>submit</button>
      </form>
    </>
  );
}

export default NewPost;
