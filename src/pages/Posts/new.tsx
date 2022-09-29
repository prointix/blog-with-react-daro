import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth";
import { IArticle } from "../../types";
import api from "../../utils/api";
import "../../assets/styles/Posts.css";
import Loading from "../Loading";

function NewPost() {
  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useAuth();

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };
  const handleFileChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.files[0] });
    console.log(article.featuredAsset);
  };

  const backFunction = () => {
    navigate("/");
  };

  const handlePost = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/articles", article, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setArticle(data);
      setLoading(true);
      alert("Post created successfully");
      console.log(article);
      return data;
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {state.signed === false ? (
        <Navigate to="/signin" />
      ) : (
        <>
          <div className="container-newpost">
            <button onClick={backFunction}>Back</button>
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
                  <button onClick={handlePost}> Create Posts</button>
                  {/* {loading && <Loading />} */}
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
