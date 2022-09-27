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
    if (confirm("Are you sure you want to publish this article?")) {
      await api.patch(`/articles/${id}/publish`);
      article.published = true;
      alert("Article published successfully");
    } else {
      return;
    }
  };

  const backFunction = () => {
    navigate("/");
  };

  const navigateToEdit = () => {
    return navigate(`/edit/${id}`);
  };

  const deleteArticle = async () => {
    if (confirm("Do you really want to delete this article?")) {
      try {
        await api.delete(`/articles/${id}`);
        alert("deleted successfully");
      } catch (err: any) {
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
      <section className="post-header">
        <div className="option-btn">
          <button onClick={backFunction}>Back</button>
          {article.published === false ? (
            <button onClick={publishArticle}>Publish</button>
          ) : (
            <button>Unpublish</button>
          )}
          <button onClick={navigateToEdit}>edit</button>
          <button onClick={deleteArticle}>delete</button>
        </div>
        <div className="header-content post-container">
          <h1 className="header-title">{article.title}</h1>
          <img src={article.featuredAsset?.url} alt="" className="header-img" />
        </div>
      </section>
      <section className="post-content post-container">
        <h2 className="sub-heading">{article.body}</h2>
        <p className="post-text">{article.description}</p>
      </section>
    </>
  );
}

export default ShowPost;
