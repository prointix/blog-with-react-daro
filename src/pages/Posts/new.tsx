import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { IArticle } from "../../types";
import api from "../../utils/api";
import "../../assets/styles/Posts.css";

function NewPost() {
  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const navigate = useNavigate();
  const { signed } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };
  const handleFileChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.files[0] });
  };

  const backFunction = () => {
    navigate("/");
  };

  const handlePost = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/articles", article, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setArticle(data);
      alert("Post created successfully");
      setLoading(false);
      return data;
    } catch (error: any) {
      alert(error.response.message);
      setLoading(false);
    }
  };
  return (
    <>
      {!signed ? (
        <Navigate to="/signin" />
      ) : (
        <>
          <div className="container-newpost">
            <button id="back-btn" onClick={backFunction}>
              Back
            </button>
            <div className="title">New Post</div>
            <div className="content">
              <form action="#">
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Title</span>
                    <input
                      type="text"
                      onChange={handleChange}
                      id="title"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">description</span>
                    <input
                      type="text"
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
                      rows={15}
                      cols={73}
                    />
                  </div>
                  <div className="file">
                    <span className="details" id="FeatureFile">
                      FeatureAssets
                    </span>
                    <input
                      type="file"
                      placeholder="image"
                      id="featuredAsset"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
                <div className="button">
                  <button onClick={handlePost}>
                    {loading ? "creating..." : " Create Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NewPost;
