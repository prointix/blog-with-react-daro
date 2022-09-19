import { useEffect, useState } from "react";
import "../assets/styles/Home.css";
import { IArticle } from "../types";
import api from "../utils/api";

// interface PostsPublicProps{
//     title: string;
//     description: string;
//     body: string;
//     featuredAsset: String
// }

export const PostsPublic: React.FC = () => {
  const [item, setItem] = useState<IArticle>({} as IArticle);

  const fetchData = async () => {
    const result = await api.get<IArticle>("/articles");
    setItem(result.data.data);
    // console.log(Object.keys(result.data.data))
    //console log the title of each item
    console.log(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //display the data
  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="posts">
        <div className="post">
          {item[1].title}
        </div>
      </div>
    </div>
  );
};
