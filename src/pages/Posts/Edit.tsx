import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../assets/styles/Posts.css";
import { IArticle } from "../../types";
import api from "../../utils/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<IArticle>({} as IArticle);

  const fetchData = async () => {
    const { data } = await api.get<IArticle>(`/articles/${id}`);
    setArticle(data);
  };

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };
  const handleFileChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.files[0] });
  };

  const editArticle = async (e: any) => {
    e.preventDefault();
    try {
      await api.patch(
        `/articles/${id}`,
        {
          title: article.title,
          description: article.description,
          body: article.body,
          featuredAsset: article.featuredAsset,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Article edited successfully");
    } catch (err: any) {
      alert(err.response.message);
    }
  };

  const backFunction = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-newpost">
        <button id="back-btn" onClick={backFunction}>
          Back
        </button>
        <div className="title">Edit Post</div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={article.title}
                  onChange={handleChange}
                  id="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">description</span>
                <input
                  type="text"
                  value={article.description}
                  onChange={handleChange}
                  id="description"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">body</span>
                <textarea
                  onChange={handleChange}
                  id="body"
                  required
                  value={article.body}
                  rows={15}
                  cols={73}
                />
              </div>
              <div className="file">
                <span className="details" id="FeatureFile">
                  <img src={article.featuredAsset?.url} alt="" />
                </span>
                Featured Image
                <input
                  type="file"
                  placeholder="image"
                  onChange={handleFileChange}
                  id="featuredAsset"
                  required
                />
              </div>
            </div>
            <div className="button">
              <button onClick={editArticle}> edit Posts</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPost;
