// Validation with react-hook-form
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import axios from "axios";

import google from "../assets/img/google.png";
import faceBook from "../assets/img/facebook.png";
import apple from "../assets/img/apple.png";
import "../assets/styles/SignIn.css";
import { AuthContext } from "../contexts/auth";

interface IFormInputs {
  email: string;
  password: string;
}

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  const handleChange = (e:any) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e:any) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err:any) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err.response.data);
    }
  };

  return (
    <div className="sign-in">
      <div className="logo">WeChii</div>
      <div className="header">
        <div className="text-container">
          <p>
            <span id="header">Sign in to </span>
            <br /> Lorem Ipsum is simply
          </p>
          <span>
            Lorem Ipsum is simply dummy text of the printing and <br />{" "}
            typesetting industry. Lorem Ipsum has been the industry's <br />{" "}
            standard dummy text ever since the 1500s,
          </span>
        </div>
        <div className="seperator"></div>
        <div className="login-container">
          <div className="login-elements">
            <div className="login-header-text">
              <p>
                Welcome to <span>WeChii</span>
              </p>
              <span>
                No Account?{" "}
                <a id="link" href="#">
                  <Link to={"/sign-up"}>
                    <p>Sign up</p>
                  </Link>
                </a>
              </span>
            </div>
            <div className="login-signin">Sign in</div>
            <div className="signin-btn">
              <button className="google">
                <img src={google} alt="" />
                <p>Sign in with Google</p>
              </button>
              <div className="small-btn">
                <button className="facebook" id="FA-icon">
                  <img src={faceBook} alt="" id="icon" />
                </button>
                &nbsp; &nbsp; &nbsp;
                <button className="apple" id="FA-icon">
                  <img src={apple} alt="" id="icon" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-input">
                <label htmlFor="" className="input">
                  Enter your username or email address
                </label>
                <br />
                <input
                  type="text"
                  placeholder="  email address"
                  
                  {...register("email", { required: true })}
                  onChange={handleChange}
                />
                <span id="error">
                  {errors.email && "email is required"}
                </span>
                <br />
                <br />
                <label htmlFor="" className="input">
                  Enter your password
                </label>
                <br />
                <input
                  type="password"
                  placeholder="   password"
                  {...register("password", {
                    required: true,
                    min: 12,
                    max: 99,
                  })}
                  onChange={handleChange}
                />
                <span id="error">
                  {errors.password && "password is required"}
                </span>
                <a href="#">
                  <span>Forgot Password</span>
                </a>
                  <button onClick={handleClick} className="submit-btn">Sign in</button>
                  
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
