import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IArticle } from "../../types";
import api from "../../utils/api";

function EditPost() {
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

  const fetchData = async () => {
    const { data } = await api.get<IArticle>(`/articles/${id}`);
    setArticle(data);
  };

  const editArticle = async (e: any) => {
    e.preventDefault();
    try {
      const result = await api.patch<IArticle>(`/articles/${id}`, article, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      alert("edit successfully");
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const backFunction = () => {
    navigate("/");
  };

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <div>
        <h1>Edit Post</h1>
        <form action="">
          <label htmlFor="">Title</label>
          <input
            id="title"
            type="text"
            value={article.title}
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <input
            id="description"
            type="text"
            value={article?.description}
            onChange={handleChange}
          />
          <label htmlFor="">Body</label>
          <input
            id="body"
            type="text"
            value={article.body}
            onChange={handleChange}
          />
          <label htmlFor=""> featuredAsset</label>
          <input
            id="featuredAsset"
            type="file"
            value={article.featuredAsset?.fileName}
            onChange={handleChange}
          />
          <button onClick={editArticle}>Edit</button>
        </form>
      </div> */}
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
                <input
                  type="text"
                  value={article.body}
                  onChange={handleChange}
                  id="body"
                  required
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
