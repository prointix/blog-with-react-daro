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
    <div>
      {articles.data.map((article) => (
        <div className="blogList-wrap" key={article.id}>
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
          <Link to={`/single-article/${article.id}`}>read more</Link>
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
