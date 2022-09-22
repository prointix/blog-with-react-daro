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
      console.log(draftArticles.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {state.signed == false ? (
        <Navigate to="/signin" />
      ) : (
        <div>
          {draftArticles.data.map((draftArticle) => (
            <div className="blogList-wrap" key={draftArticle.id}>
              <div className="blogItem-wrap">
                <img
                  className="blogItem-cover"
                  src={draftArticle.featuredAsset?.url}
                  alt="cover"
                />
                <div className="text">
                  <h3>{draftArticle.title}</h3>
                  <p className="blogItem-desc">{draftArticle.description}</p>
                </div>
              </div>
              <Link to={`/single-article/${draftArticle.id}`}>read more</Link>
            </div>
          ))}
          <footer>
            <button
              disabled={!draftArticles.meta.hasNextPage}
              onClick={fetchMoreData}
            >
              {" "}
              load more
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default PostsDraft;
