// Validation with react-hook-form
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "../assets/styles/SignIn.css";
import { useAuth } from "../contexts/auth";
import { IAuthResponse } from "../types";
import api from "../utils/api";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data } = await api.post<IAuthResponse>("/auth/login", values);
      login(data);
      setLoading(false);
    } catch (error: any) {
      alert(error.response.data.message);
      setLoading(false);
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
                  className="lInput"
                />
                {errors.password && "password is required"}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button type="submit" disabled={loading} className="submit-btn">
                  SignIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
