import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { IArticle } from "../../types";
import api from "../../utils/api";

function NewPost() {
  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const navigate = useNavigate();
  const { state } = useAuth();

  const handleChange = (e: any) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
    console.log(e.target.id);
  };

  const backFunction = () => {
    navigate("/");
  };

  const handlePost = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/articles", article, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Post created successfully");
      return data;
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div>
        {state.signed === false ? (
          <Navigate to="/signin" />
        ) : (
          <>
            <button onClick={backFunction}>Back</button>
            <form action="">
              <input
                onChange={handleChange}
                type="text"
                placeholder="title"
                required
                id="title"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="description"
                id="description"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="body"
                id="body"
                required
              />
              <input
                onChange={handleChange}
                type="file"
                placeholder="image"
                id="featuredAsset"
              />
              <button onClick={handlePost}>submit</button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default NewPost;
