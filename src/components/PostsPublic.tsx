import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/styles/Home.css";
import Loading from "../pages/Loading";
import { IArticleResponse } from "../types";
import api from "../utils/api";

export const PostsPublic = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
    } catch (err: any) {
      alert(err.response.message);
    }
  };

  const fetchMoreData = async (e: any) => {
    e.preventDefault();
    try {
      const result = await api.get<IArticleResponse>(
        `/articles?order=asc&page=${articles.meta.page + 1}&take=6`
      );
      setArticles({
        data: [...articles.data, ...result.data.data],
        meta: result.data.meta,
      });
    } catch (err: any) {
      alert(err.response.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //display the data
  return (
    <div>
      {loading ? (
        <div className="Box-container">
          <section className="post container">
            {articles.data.map((article) => (
              <div className="post-box" key={article.id}>
                <img
                  src={article.featuredAsset?.url}
                  alt=""
                  className="post-img"
                />
                <h2 className="category">Mobile</h2>
                <a href="" className="post-title">
                  {article.title}
                </a>
                <span className="post-date">{article.createdAt}</span>
                <p className="description">{article.description}</p>
                <div className="profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                    className="profile-img"
                  />
                  <span className="profile-name">{article.userId}</span>
                  <Link to={`/single-article/${article.id}`}>
                    <button id="readmore-btn">read more</button>
                  </Link>
                </div>
              </div>
            ))}
          </section>
          <footer>
            <button
              disabled={!articles.meta.hasNextPage}
              onClick={fetchMoreData}
              className="load-more-btn"
              hidden={!articles.meta.hasNextPage}
            >
              load more
            </button>
          </footer>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
