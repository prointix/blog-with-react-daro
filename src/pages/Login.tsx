// Validation with react-hook-form
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import google from "../assets/img/google.png";
import faceBook from "../assets/img/facebook.png";
import apple from "../assets/img/apple.png";
import "../assets/styles/SignIn.css";
import { AuthContext } from "../contexts/auth";
import { IAuthResponse, ILogin, IUser } from "../types";
import api from "../utils/api";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

function Login() {
  const [credentials, setCredentials] = useState<ILogin>({} as ILogin);
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<IUser>({
    createdAt: "",
    email: "",
    id: 0,
    name: "",
    updatedAt: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const handleChange = (e: any) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const login = ({ user, accessToken }: IAuthResponse) => {
    setUser(user);
    localStorage.setItem("token", accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await api.post<IAuthResponse>(
        "/auth/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      login(data);
      navigate("/");
      return data;
    } catch (error: any) {
      alert(error.response.data.message);
    }
    return user;
  };

  const navigate = useNavigate();

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
                <Link to="/sign-up" id="link">
                  <p>Sign up</p>
                </Link>
              </span>
            </div>
            <div className="login-signin">Sign in</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-input">
                <label htmlFor="" className="input">
                  email address
                </label>
                <br />
                <input
                  type="text"
                  placeholder="  email"
                  id="email"
                  {...register("email", { required: true })}
                  onChange={handleChange}
                  className="lInput"
                />
                {errors.email && "email is required"}
                <br />
                <br />
                <label htmlFor="" className="input">
                  Enter your password
                </label>
                <input
                  type="password"
                  placeholder="  password"
                  id="password"
                  {...register("password", { required: true })}
                  onChange={handleChange}
                  className="lInput"
                />
                {errors.password && "password is required"}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button
                  disabled={state.loading}
                  onClick={handleClick}
                  className="submit-btn"
                >
                  SignIn
                </button>
                {state.error && <span className="failure">{state.error}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
