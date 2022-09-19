import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { IArticle, IUser } from "../../types";
import api from "../../utils/api";


function NewPost() {

  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const {dispatch} = useContext(AuthContext)

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
    console.log(e.target.id);
  }
  const [user, setUser] = useState<IUser | null>(null);
  // useEffect(() => {
  //   const accessToken = localStorage.getItem("token");
  //   api.defaults.headers.common.Authorization= `Bearer ${accessToken}`;

  //   api
  //   .get<IUser>("/auth/me")
  //   .then((response) => {
  //     setUser(response.data);
  //   }
  //   )
  //   .catch((error) => {
  //       if(error.response.status === 401){
  //           localStorage.removeItem("token");
  //           dispatch({type: "LOGOUT"})
  //       }
  //   } );
      
  // }, []); 
  const handlePost = async (e: any) => {
    e.preventDefault();
    try {
     const { data } = await axios.post<IArticle>(
      "https://blogserver.fly.dev/articles",
      article,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;

    } catch (error) {
      alert(error);
  };
}
  return(

    <>
      <form action="">
        <input onChange={handleChange} type="text" placeholder="title" required id="title" />
        <input onChange={handleChange}  type="text" placeholder="description" id="description"/>
        <input onChange={handleChange}  type="text" placeholder="body" id="body" required/> 
         <input onChange={handleChange}  type="file" placeholder="image" id="featuredAsset" />
        <button onClick={handlePost}>submit</button>
      </form>
    </>
  )
}

export default NewPost;
