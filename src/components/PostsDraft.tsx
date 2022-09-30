import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Loading from "../pages/Loading";
import { IArticleResponse } from "../types";
import api from "../utils/api";

function PostsDraft() {
  const [loading, setLoading] = useState(false);
  const { signed } = useAuth();
  const [draftArticles, setDraftArticles] = useState<IArticleResponse>({
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
        "/articles/drafts?order=asc&page=1&take=6"
      );
      setDraftArticles(result.data);
      setLoading(true);
    } catch (err: any) {
      alert(err.response.message);
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
    } catch (err: any) {
      alert(err.response.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Box-container">
      {!signed ? (
        <Navigate to="/signin" />
      ) : (
        <>
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
                  {draftArticles.title}
                </a>
                <span className="post-date">{draftArticles.createdAt}</span>
                <p className="description">{draftArticles.description}</p>
                <div className="profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                    className="profile-img"
                  />
                  <span className="profile-name">Daro Sim</span>
                  <Link to={`/single-article/${draftArticles.id}`}>
                    <button>read more</button>
                  </Link>
                </div>
              </div>
            ))}
          </section>
          <footer>
            <button
              disabled={!draftArticles.meta.hasNextPage}
              onClick={fetchMoreData}
              className="load-more-btn"
              //hide the button if there is no more data to show
              hidden={!draftArticles.meta.hasNextPage}
            >
              load more
            </button>
          </footer>
        </>
      )}
      {draftArticles.data.length === 0 && (
        <div>
          <h1 className="no-draft">You have no draft</h1>
        </div>
      )}
      {!loading && <Loading />}
    </div>
  );
}

export default PostsDraft;
