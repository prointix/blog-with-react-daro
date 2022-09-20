import React, { useEffect, useState } from "react";

import "../assets/styles/Home.css";
import { IArticleResponse } from "../types";
import api from "../utils/api";

interface PostItemProps {}

export const PostItem: React.FC = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};
