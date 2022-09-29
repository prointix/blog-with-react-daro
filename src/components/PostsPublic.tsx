import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import { useAuth } from "../contexts/auth";
import { IArticleResponse } from "../types";
import api from "../utils/api";

export const PostsPublic = () => {
  const { state } = useAuth();
  const [articles, setArticles] = useState<IArticleResponse>({
    data: [],
    meta: {
      page: 0,
      take: 6,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  });

  const fetchData = async () => {
    try {
      const result = await api.get<IArticleResponse>(
        "/articles?order=asc&page=1&take=6"
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
    <div className="Box-container">
      <section className="post container">
        {articles.data.map((article) => (
          <div className="post-box" key={article.id}>
            <img src={article.featuredAsset?.url} alt="" className="post-img" />
            <h2 className="category">Mobile</h2>
            <a href="" className="post-title">
              {article.title}
            </a>
            <span className="post-date">{article.createdAt}</span>
            <p className="description">{article.description}</p>
            <div className="profile">
              <img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*"
                alt=""
                className="profile-img"
              />
              <span className="profile-name">{article.userId}</span>
              <Link to={`/single-article/${article.id}`}>read more</Link>
            </div>
          </div>
        ))}
      </section>
      <footer>
        <button
          disabled={!articles.meta.hasNextPage}
          onClick={fetchMoreData}
          className="load-more-btn"
        >
          load more
        </button>
      </footer>
    </div>
  );
};
