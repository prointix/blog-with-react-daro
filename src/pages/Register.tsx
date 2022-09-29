import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../assets/styles/SignIn.css";
import { IRegister } from "../types";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

function Register() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<IRegister>({} as IRegister);

  const handleChange = (e: any) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  async function handleClick(e: any) {
    try {
      const { data } = await axios.post<IRegister>(
        "https://blogserver.fly.dev/auth/register",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registration successful");
      navigate("/signin");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
        return error.message;
      } else {
        return "An unexpected error occurred";
      }
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

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
                Have an Account?{" "}
                <a href="#">
                  <Link to={"/signin"}>
                    <p>Sign in</p>
                  </Link>
                </a>
              </span>
            </div>
            <div className="login-signin">Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="login-input">
                <label htmlFor="" className="input">
                  name
                </label>
                <br />
                <input
                  {...register("name", { required: true })}
                  onChange={handleChange}
                  type="text"
                  placeholder="  name"
                  id="name"
                />
                {errors.name && "email is required"}
                <br />
                <label htmlFor="" className="input">
                  Enter your email
                </label>
                <br />
                <input
                  {...register("email", { required: true })}
                  onChange={handleChange}
                  type="email"
                  placeholder="   email"
                  id="email"
                />
                {errors.email && "email is required"}
                <br />
                <label htmlFor="" className="input">
                  Enter your password
                </label>
                <br />
                <input
                  {...register("password", { required: true })}
                  onChange={handleChange}
                  type="password"
                  placeholder="   password"
                  id="password"
                />
                {errors.password && "email is required"}
                <br />
                <br />
                <button onClick={handleClick} className="submit-btn">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
