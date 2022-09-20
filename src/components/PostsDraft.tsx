import { useState, useEffect } from "react";
import { IArticleResponse } from "../types";
import api from "../utils/api";

function PostsDraft() {
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

  const fetchMoreData = async (e: any) => {
    e.preventDefault();
    try {
      const result = await api.get<IArticleResponse>(
        `/articles?order=asc&page=${draftArticles.meta.page + 1}&take=5`
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
    <div>
      {draftArticles.data.map((draftArticle) => (
        <div className="blogList-wrap">
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
  );
}

export default PostsDraft;
