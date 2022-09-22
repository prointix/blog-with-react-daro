import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IArticle } from "../../types";
import api from "../../utils/api";

function ShowPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<IArticle>({
    id: 0,
    title: "",
    description: "",
    body: "",
    featuredAsset: null,
    createdAt: "",
    updatedAt: "",
    featuredAssetId: 0,
    published: false,
    userId: 0,
  });

  const publishArticle = async () => {
    try {
      const result = await api.patch(`/articles/${id}/publish`);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToEdit = () => {
    return navigate(`/edit/${id}`);
  };

  const deleteArticle = async () => {
    if (confirm("Do you really want to delete this article?")) {
      try {
        const result = await api.delete(`/articles/${id}`);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setArticle(res.data);
    });
  }, []);

  return (
    <>
      <div className="option-btn">
        <button onClick={publishArticle}>publish</button>
        <button onClick={navigateToEdit}>edit</button>
        <button onClick={deleteArticle}>delete</button>
      </div>
      <div className="articleItem-wrap">
        <img
          className="articleItem-cover"
          src={article.featuredAsset?.url}
          alt="cover"
        />
        <div className="articleItem-content">
          <h2 className="articleItem-title">{article.title}</h2>
          <p className="articleItem-description">{article.description}</p>
          <p className="articleItem-body">{article.body}</p>
        </div>
      </div>
    </>
  );
}

export default ShowPost;
