import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { IArticleResponse } from "../types";
import api from "../utils/api";

function PostsDraft() {
  const { state } = useAuth();
  const [draftArticles, setDraftArticles] = useState<IArticleResponse>({
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
        "/articles/drafts?order=asc&page=1&take=5"
      );
      setDraftArticles(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // passing draftID to

  const fetchMoreData = async (e: any) => {
    e.preventDefault();
    try {
      const result = await api.get<IArticleResponse>(
        `/articles/drafts?order=asc&page=${draftArticles.meta.page + 1}&take=5`
      );
      setDraftArticles({
        data: [...draftArticles.data, ...result.data.data],
        meta: result.data.meta,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Box-container">
      {state.signed === false ? (
        <Navigate to="/signin" />
      ) : (
        <section className="post container">
          {draftArticles.data.map((draftArticles) => (
            <div className="post-box" key={draftArticles.id}>
              <img
                src={draftArticles.featuredAsset?.url}
                alt=""
                className="post-img"
              />
              <h2 className="category">Mobile</h2>
              <a href="" className="post-title">
                Creating website using ReactTs
              </a>
              <span className="post-date">{draftArticles.createdAt}</span>
              <p className="description">{draftArticles.description}</p>
              <div className="profile">
                <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*"
                  alt=""
                  className="profile-img"
                />
                <span className="profile-name">Daro Sim</span>
                <Link to={`/single-article/${draftArticles.id}`}>
                  read more
                </Link>
              </div>
            </div>
          ))}
          <footer>
            <button
              disabled={!draftArticles.meta.hasNextPage}
              onClick={fetchMoreData}
              className="load-more-btn"
              hidden={draftArticles.data.length === 0}
            >
              load more
            </button>
          </footer>
        </section>
      )}
      {draftArticles.data.length === 0 && (
        <div>
          <h1 className="no-draft">You have no draft</h1>
        </div>
      )}
    </div>
  );
}

export default PostsDraft;
