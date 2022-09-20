import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import { IArticle, IArticleResponse } from "../types";
import api from "../utils/api";

export const PostsPublic = () => {
  const [articles, setArticles] = useState<IArticleResponse>({
    data: [],
    meta: {
      page: 0,
      take: 5,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  });

  const fetchData = async () => {
    try {
      const result = await api.get<IArticleResponse>(
        "/articles?order=asc&page=1&take=5"
      );
      setArticles(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreData = async (e: any) => {
    e.preventDefault();
    try {
      const result = await api.get<IArticleResponse>(
        `/articles?order=asc&page=${articles.meta.page + 1}&take=5`
      );
      setArticles({
        data: [...articles.data, ...result.data.data],
        meta: result.data.meta,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //display the data
  return (
    // <div className="App">
    //   <h1>Posts</h1>
    //   <div className="posts">
    //     <div className="post">
    //       {articles.data.map((article) => (
    //         <div className="post" key={article.id}>
    //           <h2>{article.title}</h2>
    //           <p>{article.description}</p>
    //           <img src={article.featuredAsset?.url} alt="featuredAsset" />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <button disabled={!articles.meta.hasNextPage} onClick={fetchMoreData}>
    //     Load more
    //   </button>
    // </div>
    <div>
      {articles.data.map((article) => (
        <div className="blogList-wrap">
          <div className="blogItem-wrap">
            <img
              className="blogItem-cover"
              src={article.featuredAsset?.url}
              alt="cover"
            />
            <div className="text">
              <h3>{article.title}</h3>
              <p className="blogItem-desc">{article.description}</p>
            </div>
          </div>
        </div>
      ))}
      <footer>
        <button disabled={!articles.meta.hasNextPage} onClick={fetchMoreData}>
          {" "}
          load more
        </button>
      </footer>
    </div>
  );
};
